// import the User(db) from the models folder
const User = require('../models/user');

// Render the profile page
module.exports.profile = async (req, res)=> {
    let profileVariable = {
        title: 'Gokul'
    }
    return res.render('profile', profileVariable)
}

// Render the Signin page
module.exports.signIn = async (req, res) => {
    let signinVariables = {
        title: 'Codeial | SIGN IN'
    }
    return res.render("user_signin", signinVariables);
}

// Render the Signup page
module.exports.signUp = async (req, res) => {
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
    return res.redirect('/users/profile');
}