// Configure passport to use a LocalStrategy for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import the User model


// Set up the LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email' // Use the 'email' field for username
    },
    // This function is called during authentication
    (email, password, done) => {
        // Find a user with the provided email
        User.findOne({email:email})
        .then((user) => {
            if (!user || user.password != password) { 
                console.log("Invalid User");
                return done(null, false); // Authentication failed
            }
            return done(null, user); // Authentication successful
        })
        .catch((err) => {
            console.log('Error in finding user --> Passport');
            return done(err); // Return error if there's a problem
        })
    }
));


// Serializing the user to determine which key is needed to be stored in the cookies
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user by storing their ID in the session cookies
});

// Deserializing the user from the key stored in the cookies
passport.deserializeUser((id, done) => {
    // Find the user based on the stored ID
    User.findOne({ _id: id})
    .then((user) => {
      // if succeeded do this block of code
      return done(null, user);
    })
    .catch((err) => {
      // catch error
      console.log('Error in finding user --> Passport');
      return done(err);
    });
});

// Check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is signed in then pass on the request to the next function(controller's actions) 
    if (req.isAuthenticated()){
        return next();
    }
    
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticationUser = (req, res, next) => {
    if (req.isAuthenticated()){
        // req.user contains the current signed in user for the session cookies and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next()
}

module.exports = passport;