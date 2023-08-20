import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps:true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;