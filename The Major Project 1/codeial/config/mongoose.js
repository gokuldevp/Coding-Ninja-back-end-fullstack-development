// Importing the Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Connecting to the "condial_development" database on the local MongoDB server
mongoose.connect('mongodb://127.0.0.1/condial_development');

// Creating a connection object "db" that represents the connection to the database
const db = mongoose.connection;

// Handling the 'error' event to log errors when connecting to the database
db.on('error', console.error.bind(console, "Error while connecting to DB!"));

// Using the 'once' event to log a success message once the connection is established
db.once("open", function() {
    console.log("connected to Database: Mongo DB!");
});

// Exporting the 'db' connection for use in other parts of the application
module.exports = db;
