const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// Controller action for rendering the home page
module.exports.home = async (req, res) => {
    // Find all posts and populate the 'user' field for each post
    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            // populate all the comments for each post and populate the user for each comments
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let user = await User.find({})

        // Prepare variables to be sent to the home view template
        let homeVariables = {
            title: 'Codeial', // Title of the page
            posts: posts,      // List of posts retrieved from the database
            all_users: user
        };
        // Render the 'home' view template with the prepared variables
        return res.render("home", homeVariables);

    } catch(error) {
        console.log("Error : ", error);
        // If an error occurs during database retrieval, log the error and return
        return;
    }
}

module.exports.createPost = async (req, res) => {
    // Add the post in the DB
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        // On successful user creation of post, redirect 'back' page.
        return res.redirect('back');

    } catch(error) {
        console.log("Error : ", error);
        // If an error occurs during database retrieval, log the error and return
        return;
    }
}


// Exporting a function to handle the deletion of a post and its associated comments
module.exports.destoryPost = async (req, res) => {
    try {
        // Extract the post ID from the request parameters
        const postId = req.params.id;

        // Find the post by its ID
        let post = await Post.findById(postId);

        // Check if the authenticated user is the owner of the post
        if (post.user == req.user.id) {
            // If the authenticated user owns the post, proceed to delete it

            // Remove the post from the database
            await Post.deleteOne({ _id: postId });

            // Delete all comments associated with the post
            await Comment.deleteMany({ post: postId });

            // Redirect the user back to the previous page
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        // If an error occurs anywhere within the try block, it will be caught here

        // Log the error for debugging purposes
        console.log("Error: " + error);

        // Return without taking any further action, since an error occurred
        return;
    }
}


