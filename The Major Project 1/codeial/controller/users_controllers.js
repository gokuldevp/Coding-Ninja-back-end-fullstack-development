// import the User(db) from the models folder
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// Render the profile page
module.exports.profile = (req, res)=> {
    let userId = req.params.id;
    // console.log(userId)

    User.findById(userId)
    .then((user) => {
        let profileVariable = {
            title: 'Profile Page',
            profile_user: user
        }
        return res.render('profile', profileVariable)
    })
}

// // Update Profile Route Handler
// module.exports.updateProfile = async (req, res) => {
//     const userId = req.params.id; // Extract the user ID from the request parameters

//     // Check if the requesting user's ID matches the provided user ID
//     if (req.user.id == userId) {
//         // Use the Mongoose method to update the user's information by their ID
//         await User.findByIdAndUpdate(
//             userId, // User's ID to identify the document to update
//             { name: req.body.name, email: req.body.email }, // New name and email values from the request body
//             { new: true } // Return the updated document after the update
//         )
//         .then(() => {
//             console.log("Updated user information!"); // Log a message indicating a successful update
//             return res.redirect('back'); // Redirect the user back to the previous page
//         })
//         .catch((error) => {
//             console.log(`Error while updating user's information ${error}`); // Log an error message if update fails
//             return res.status(500).send('<h1>Error in server end</h1>'); // Respond with a 500 status code for internal server error
//         });
//     } else {
//         // Respond with a 401 status code indicating unauthorized access
//         return res.status(401).send('<h1>Unauthorized</h1>');
//     }
// }

module.exports.updateProfile = async (req, res) => {
    const userId = req.params.id; // Extract the user ID from the request parameters

    // Check if the requesting user's ID matches the provided user ID
    if (req.user.id == userId) {
        try {
            // Find the user by their ID in the database
            let user = await User.findById(userId);

            // Use the uploadedAvatar middleware to handle the file upload
            User.uploadedAvatar(req, res, (err) => {
                if (err) {
                    console.log('******Multer Error!', err);
                }

                // Update user's name and email based on the submitted form data
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    // If an avatar file was uploaded, update the user's avatar path

                    if (user.avatar){
                        // delete the exising avatar if the avatar exists
                        const existingAvatarPath = path.join(__dirname, '..', user.avatar);

                        if (fs.existsSync(existingAvatarPath)) {
                            // Delete the existing avatar file
                            fs.unlinkSync(existingAvatarPath);
                        }
                    }                    

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                } else {
                    // Handle the case when no new avatar was uploaded
                    // You might choose to keep the existing avatar or take other actions here
                }
                
                user.save();
                req.flash('success', "successfully save the user details!");
                // Save the updated user information and redirect back to the previous page
                return res.redirect('back');
            });

        } catch (error) {
            console.log(error)
            req.flash('error', error);
            return res.redirect('back');
        }

    } else {
        // Respond with a 401 status code indicating unauthorized access
        return res.status(401).send('<h1>Unauthorized</h1>');
    }

}


// Render the Signin page
module.exports.signIn = async (req, res) => {
    // If the user is authenticated, they are redirected to their profile.
    if (req.isAuthenticated()){
        return res.redirect(`/users/profile`);
    }

    // the "user_signin" template is rendered with appropriate variables.
    let signinVariables = {
        title: 'Codeial | SIGN IN'
    }
    return res.render("user_signin", signinVariables);
}

// Render the Signup page
module.exports.signUp = async (req, res) => {
    // If the user is authenticated, they are redirected to their profile.
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    // the "user_signup" template is rendered with appropriate variables.
    let signupVariables = {
        title: 'Codeial | SIGN UP'
    }
    return res.render("user_signup", signupVariables);
}

// Controller function to handle user sign-up.
module.exports.create = async (req, res) => {

    // Check if the 'password' and 'confirmpassword' fields match.
    if (req.body.password !== req.body.confirmpassword) {

        // Log a message indicating password mismatch.
        console.log("Password Mismatch");

        // If the passwords do not match, redirect back to the previous page.
        return res.redirect('back');
    }

    // Find a user with the provided email in the database using the 'User' model.
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (!user) {
                // If no user with the provided email exists, create a new user with the form data.

                User.create(req.body)
                    .then((user) => {
                        // On successful user creation, redirect to the '/users/sign-in' page to prompt the user to sign in.
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => {
                        // If there's an error while creating the user, log the error and return.
                        console.log("Error while creating user while signup!");
                        return;
                    });

            } else {
                // If a user with the same email already exists, redirect back to the previous page.
                console.log("User Already Exists");
                return res.redirect('back');
            }
        })
        .catch((err) => {
            // If there's an error while finding the user, log the error and return.
            console.log("Error in finding user in signup!");
            return;
        });
};


// Handing User Signin
module.exports.createSession = async (req, res) => {
    req.flash('success', "You have Successfully logged in")

    return res.redirect('/users/profile/'+ req.user._id);
}

// Handle signout 
module.exports.signOut = async (req, res) => {
    

    req.logout((err) => {
        if (err) {
            console.error(err);
            return;
        }
        req.flash('success', "You have Successfully logged out");
        return res.redirect('/');
    });
};
