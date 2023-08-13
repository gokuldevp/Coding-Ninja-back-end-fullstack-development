// Configure passport to use a LocalStrategy for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import the User model
const { use } = require('../routes');

// Set up the LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email' // Use the 'email' field for username
    },
    // This function is called during authentication
    (email, password, done) => {
        // Find a user with the provided email
        User.findOne({ email: email }, function (err, user) {
            if (err) { 
                console.log('Error in finding user --> Passport');
                return done(err); // Return error if there's a problem
            }
            if (!user || user.password != password) { 
                console.log("Invalid User");
                return done(null, false); // Authentication failed
            }
            return done(null, user); // Authentication successful
        });
    }
));

// Serializing the user to determine which key is needed to be stored in the cookies
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user by storing their ID in the session cookies
});

// Deserializing the user from the key stored in the cookies
passport.deserializeUser((id, done) => {
    // Find the user based on the stored ID
    User.findById(id, (err, user) => {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err); // Return error if there's a problem
        }

        return done(err, user); // Return the deserialized user
    });
});

module.exports = passport;