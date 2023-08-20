const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComments = async (req, res) => {
    // Extract the post ID from the request body
    const postId = req.body.post;

    // Find the post by its ID using Mongoose's .then() promise chain
    Post.findById(postId)
    .then((post) => {
        // If the post with the given ID exists
        if (post) {
            // Create a new comment using Comment model
            Comment.create({
                content: req.body.content,
                post: postId,
                user: req.user._id,
            }).then((comment) => {
                // Push the new comment to the post's comments array
                post.comments.push(comment);

                // Save the updated post with the new comment
                post.save();

                // Redirect back to the previous page
                return res.redirect("back");
            }).catch((error) => {
                // Handle comment creation error
                console.log("Error while creating the comment in the database");
                return res.send(`<h1>${error}<h1>`);
            })
        } else {
            // If the post doesn't exist
            console.log("Post doesn't exist");
            return res.redirect('back');
        }
    }).catch((error) => {
        // Handle post finding error
        console.log("Error while finding the post from the database");
        return res.send(`<h1>${error}<h1>`);
    })
}
