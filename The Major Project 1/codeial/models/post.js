// This code defines a Mongoose schema and model for a 'Post' in a social media application.
// It uses the mongoose library to interact with a MongoDB database.

const mongoose = require('mongoose');

// Define the structure of a 'Post' using a Mongoose schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This refers to the 'User' model for associating posts with users
        required: true
    },
    // including the array of all ids of the comments in the post schema it self
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true // This automatically adds 'createdAt' and 'updatedAt' fields to each document
});

// Create a 'Post' model based on the defined schema
const Post = mongoose.model('Post', postSchema);

// Export the 'Post' model to be used in other parts of the application
module.exports = Post;
