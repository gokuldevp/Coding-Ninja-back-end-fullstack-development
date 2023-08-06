// import the User(db) from the models folder
const User = require('../models/user');


// Render the profile page
module.exports.profile = async (req, res) => {
    // Find the user using the cookie id
    let _id = req.cookies.user_id;

    if (!_id) {
        // If the user cookie is not present, log the message and redirect to the sign-in page.
        console.log("The user cookie is not present!");
        return res.redirect('/users/sign-in');
    }

    // Find the user with the provided _id in the User collection.
    User.findOne({ _id })
        .exec()
        .then((user) => {
            // If the user is found
            if (user) {
                const navlinks = [{itemName:'Sign Out',link:'/users/sign-out'},]

                // Create a variable to pass user data to the profile page template.
                let profileVariable = {
                    title: user.name,
                    email: user.email,
                    navLinks: navlinks
                };
                // Render the 'profile' page with the user data.
                return res.render('profile', profileVariable);
            } else {
                // If the user is not found, log the message and redirect to the sign-in page.
                console.log("User is not found!");
                return res.redirect('/users/sign-in');
            }
        })
        .catch((err) => {
            // If there's an error while accessing the profile page, log the error and return.
            console.log("Error in redirecting the profile page!");
            return;
        });
};


// Render the Signin page
module.exports.signIn = async (req, res) => {
    const navlinks = [{itemName:'Sign Up',link:'/users/sign-up'},]

    let signinVariables = {
        title: 'Codeial | SIGN IN',
        navLinks: navlinks
    }
    return res.render("user_signin", signinVariables);
}

// Render the Signup page
module.exports.signUp = async (req, res) => {
    const navlinks = [{itemName:'Sign In',link:'/users/sign-in'},]
    let signupVariables = {
        title: 'Codeial | SIGN UP',
        navLinks: navlinks
    }
    return res.render("user_signup", signupVariables);
}

// Controller function to handle user sign-out
module.exports.signOut = async (req, res) => {
    // Clear the 'user_id' cookie to sign out the user
    res.clearCookie('user_id');

    // Redirect the user to the sign-in page after signing out
    res.redirect('/users/sign-in');
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
                // If a user with the same email already exists, redirect back to the signin page.
                console.log("User Already Exists");
                return res.redirect('/users/sign-in');
            }
        })
        .catch((err) => {
            // If there's an error while finding the user, log the error and return.
            console.log("Error in finding user in signup!");
            return;
        });
};



// Handling User Signin
module.exports.createSession = async (req, res) => {
    // Find the user
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            // handle user found
            if (user) {
                // handle password mismatch
                if (user.password !== req.body.password) {
                    console.log("The password is wrong");
                    return res.redirect('back');
                }

                // handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            } else {
                // handle user not found
                console.log("The user is not found");
                return res.redirect('back');
            }
        })
        .catch((err) => {
            // error in finding user during signin
            console.log("Error in finding user during signin!");
            return;
        });
};
