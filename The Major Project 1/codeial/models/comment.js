// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Comment model
const commentSchema = mongoose.Schema({
    content: { type: String, required: true }, // Comment content
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who made the comment
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true } // Post to which the comment belongs
}, { timestamps: true }); // Enable automatic timestamps for createdAt and updatedAt fields

// Create the Comment model using the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model so it can be used in other parts of the application
module.exports = Comment;
