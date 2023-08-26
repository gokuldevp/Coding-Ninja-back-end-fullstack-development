const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// Controller action for rendering the home page
module.exports.home = async (req, res) => {
    // Find all posts and populate the 'user' field for each post
    Post.find({})
    .populate('user')
    .populate({
        // populate all the comments for each post and populate the user for each comments
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then((posts) => {
        User.find({})
        .then((user) => {
            // Prepare variables to be sent to the home view template
            let homeVariables = {
                title: 'Codeial', // Title of the page
                posts: posts,      // List of posts retrieved from the database
                all_users: user
            };
            // Render the 'home' view template with the prepared variables
            return res.render("home", homeVariables);
        })
    })
    .catch((err) => {
        console.log("Error while finding posts:", err);
        // If an error occurs during database retrieval, log the error and return
        return;
    });
}

module.exports.createPost = async (req, res) => {
    // Add the post in the DB
    Post.create({
        content: req.body.content,
        user: req.user._id,
    })
    .then((post) => {
        // On successful user creation of post, redirect 'back' page.
        return res.redirect('back');
    })
    .catch((err) => {
        // If there's an error while creating the Post, log the error and return.
        console.log("Error while creating user post!");
        return;
    });
}


module.exports.destoryPost = async (req, res) => {
    const postId = req.params.id;
    
    // Find the post with the given ID
    Post.findById(postId)
    .then(async (post) => {
        // Check if the current user's ID matches the user ID of the post
        // This ensures that only the owner of the post can delete it
        if (post.user == req.user.id) {
            // Remove the post
            await Post.deleteOne({ _id: postId });

            // Delete all comments associated with the post
            Comment.deleteMany({ post: postId })
            .then((comment) => {
                console.log("The comments related to the post have been deleted");
                // Redirect the user back to the previous page
                return res.redirect('back');
            });

        } else {
            // If the user is not the owner of the post, redirect back to the previous page
            return res.redirect('back');
        }
    })
    .catch((error) => {
        console.log("Error while finding the post!" + error);
        return;
    });
}

