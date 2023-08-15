// Import the 'express' module to create an Express application.
const express = require('express');

// import the 'cookie-parser' to handle cookie
const cookieParser = require('cookie-parser');

// Set the port number to 8000.
const port = 8000;

// Create the Express app.
const app = express();

// import mongoose from the mongoose.js file
const db = require('./config/mongoose');

// Import required modules for user session management and authentication
const session = require('express-session'); // Handle user session data
const passport = require('passport'); // Manage authentication
const passportLocal = require('./config/passport-local-strategy'); // Import local authentication strategies

// import the 'connect-mongo' to save cookies in db
const MongoStore = require('connect-mongo');


// Middleware to parse incoming request bodies with 'Content-Type: application/x-www-form-urlencoded' format.
app.use(express.urlencoded({extended: true}));

// // Middleware to parse and handle cookies attached to incoming requests.
app.use(cookieParser())

// Using the middleware 'express.static' handles serving static files in Express, Serving static files from the 'assets' directory 
app.use(express.static('./assets'));

// Import the 'express-ejs-layouts' module to assess the layout file
const expressLayouts = require("express-ejs-layouts");

//Using express-ejs-layouts middleware
app.use(expressLayouts)

// Extrect style and script from subpages in to te layouts
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

// Set the view engine to 'ejs' to enable rendering of EJS templates.
app.set('view engine', 'ejs');

// Set the 'views' directory to './views' where the EJS templates are located.
app.set('views', './views');


// Configure session management using Express.js middleware
app.use(session({
    name: 'codeial',                 // Name of the session cookie
    secret: 'abcdef',                // Secret used to sign and encrypt session data
    saveUninitialized: false,        // Don't save uninitialized sessions
    resave: false,                   // Don't save session if it hasn't been modified
    cookie: {
        maxAge: (1000 * 60 * 100)    // Maximum age of the session cookie (in milliseconds)
    },
    // Use MongoStore to save the session cookie in the MongoDB database
    store: MongoStore.create({
        // Provide the URL for connecting to the MongoDB database
        mongoUrl: 'mongodb://127.0.0.1/condial_development'
    },
    // Callback function executed after attempting to establish the connection
    (err) => {
        // If an error occurs during the connection, log the error
        // Otherwise, indicate successful connection
        console.log(err || "Mongo store is connected successfully!")
    }
    )
}));


// Initialize and set up Passport.js for authentication
app.use(passport.initialize());   // Initialize Passport authentication
app.use(passport.session());      // Manage user sessions with Passport

// Use the custom middleware to ensure that the authenticated user information is available in requests
app.use(passport.setAuthenticationUser);

// Use the routes defined in the './routes' file for all incoming requests at the root path ('/').
app.use('/', require('./routes'));

// Start the server and make it listen on the specified port (8000).
app.listen(port, (err)=> {
    // Check for any errors that occurred during server startup. If an error occurs, log the error message.
    if(err){
        console.log(`Error while running the server ${err}`);
    }
    // If the server starts successfully, log a success message along with the port number.
    console.log(`Server is running successfully at port ${port}`)
});