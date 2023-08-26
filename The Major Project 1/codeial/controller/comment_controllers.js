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


// This function handles the deletion of a comment from both the Comment collection and the associated Post's comments array.
// It takes a request and a response object as parameters, expecting the comment ID to be provided in the request parameters.
module.exports.destoryComments = async (req, res) => {
    const commentId = req.params.id;

    // Find the comment with the given ID
    Comment.findById(commentId)
    .then(async (comment) => {
        if (comment.user == req.user.id) { // Check if the current user owns the comment
            let postId = comment.post; // Get the associated post's ID

            // Delete the comment from the Comment collection
            await Comment.deleteOne({ _id: commentId });

            // Remove the comment ID from the comments array of the associated post
            Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } })
            .then(() => {
                console.log("Comment has been deleted from the Post!");
                return res.redirect('back'); // Redirect the user back to the previous page
            })
            .catch((error) => {
                // Handle post update error
                console.log("Error while updating post's comments array.");
                return res.send(`<h1>${error}</h1>`);
            });
        }
    })
    .catch((error) => {
        // Handle comment finding error
        console.log("Error while finding comment from the database");
        return res.send(`<h1>${error}</h1>`);
    });
}
