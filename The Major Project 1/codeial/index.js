// Import the 'express' module to create an Express application.
const express = require('express');

// Set the port number to 8000.
const port = 8000;

// Create the Express app.
const app = express();

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts)

// Use the routes defined in the './routes' file for all incoming requests at the root path ('/').
app.use('/', require('./routes'));
// Set the view engine to 'ejs' to enable rendering of EJS templates.
app.set('view engine', 'ejs');

// Set the 'views' directory to './views' where the EJS templates are located.
app.set('views', './views');

// Start the server and make it listen on the specified port (8000).
app.listen(port, (err)=> {
    // Check for any errors that occurred during server startup. If an error occurs, log the error message.
    if(err){
        console.log(`Error while running the server ${err}`);
    }
    // If the server starts successfully, log a success message along with the port number.
    console.log(`Server is running successfully at port ${port}`)
});