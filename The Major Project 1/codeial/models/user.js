const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATER_PATH = path.join('/uploads/users/avaters');

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
    avatar: {
        type: String
    }
}, {
    timestamps: true,        //automatically create create at and updated at fields
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Getting the avather path
      cb(null, path.join(__dirname,'..', AVATER_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

//static
// Define a static method on the User schema to handle avatar uploads using multer
// This method configures multer to use the specified storage and handle single file uploads
// 'avater' is the name of the field in the form used for uploading the avatar
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');

// Define a static property to store the path where avatars are uploaded
// AVATAR_PATH should be replaced with the actual path where avatars are stored
userSchema.statics.avatarPath = AVATER_PATH;



const User = mongoose.model('User',userSchema);     // Create a new model using the user schema

module.exports = User;