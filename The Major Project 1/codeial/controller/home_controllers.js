const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    let homeVariables = {
        title: 'Codeial'
    }
    return res.render("home", homeVariables);
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