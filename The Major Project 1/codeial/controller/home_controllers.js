const Post = require('../models/post');

// Controller action for rendering the home page
module.exports.home = async (req, res) => {
    // Find all posts and populate the 'user' field for each post
    Post.find({}).populate('user')
    .then((posts) => {
        // Prepare variables to be sent to the home view template
        let homeVariables = {
            title: 'Codeial', // Title of the page
            posts: posts      // List of posts retrieved from the database
        };
        // Render the 'home' view template with the prepared variables
        return res.render("home", homeVariables);
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