const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    // Creating a new Schema
    email: {
        type: String,       // set the type as string
        required: true,     // make the attribute as manditory
        unique: true,       // make the attribute unique(no dublicates are allowed)
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,        //automatically create create at and updated at fields
});


const User = mongoose.model('User',userSchema);     // Create a new model using the user schema

module.exports = User;