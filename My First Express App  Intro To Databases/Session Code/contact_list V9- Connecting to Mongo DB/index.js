const express = require("express"); // import express
const path = require("path");       // import path
const port = 8000;                  // setting port

const db = require('./config/mongoose'); // requre the db from the mongoose file
const Contact = require("./models/contact");
const app = express();              // create a new instance of express applications

app.set("view engine", "ejs");      // Setting up View engine as ejs
app.set("views", path.join(__dirname, "views"));    // setting up the template folder
app.use(express.urlencoded({ extended: true }));    // is setting up middleware in an Express.js application to handle URL-encoded form data.
app.use(express.static("assets"));  // is a middleware in express.js application to handle static file


app.get(["/", "/home.ejs"], async (req, res) => {
    // This route handles the GET request to the homepage ("/") and the "/home.ejs" URL.

    // Fetch all contacts from the database and store them in the "contactList" variable.
    // The "await" keyword ensures that the code waits for the operation to complete before proceeding.
    let contacts = await Contact.find({});

    // Create an object "homeVariables" that holds data to be passed to the EJS template.
    let homeVariables = {
        title: "My Contact List",         // The title for the homepage
        heading: "My Contact Lists",      // The heading to display on the page
        nav_item: ["Add New Contact"],    // An array of navigation items (e.g., for a navigation bar)
        contact_list: contacts         // The list of contacts fetched from the database
    };

    // Render the "home" EJS file and pass the "homeVariables" object as data to the template.
    // The template will use the data to dynamically generate the content of the page.
    return res.render("home", homeVariables);
});


app.get("/add_contact.ejs", (req, res) => {        
    // The file create a new object and add it as a variable to render

    let homeVariables = {
        title : "Add New contact",
        heading: "Add New Contact",
        nav_item: ["My Contact List"],
    }
    return res.render("add_contact", homeVariables)    // renter the ejs file
});

app.post(("/create-contact"), async (req, res) => {
    // This route handles the form submission when a user submits a form to add a new contact.

    try {
        // Attempt to create a new contact in the database using the Mongoose model "Contact".
        // The data for the new contact is taken from the HTTP request body.
        const newContact = await Contact.create({ name: req.body.name, mobile: req.body.mobile });

        // If the contact creation is successful, log a success message to the console.
        console.log('New contact created:', newContact);

        // Redirect the client (browser) back to the previous page after successfully creating the contact.
        return res.redirect('back');
    } catch (error) {
        // If an error occurs during the contact creation process, handle the error here.
        // Log an error message to the console indicating the type of error that occurred.
        console.error('Error creating contact:', error);

        // Send an HTTP 500 status code and the message "Error creating contact" to the client (browser).
        // The 500 status code indicates a server error, and the client will receive this response.
        res.status(500).send('Error creating contact');
    }
});


app.get("/delete-contact/:id", async (req, res) => {
    // This route handles the GET request to delete a contact based on the provided contact ID (/:id).

    // Extract the contact ID from the request parameters.
    let id = req.params.id;

    try {
        // Attempt to find the contact by ID and delete it from the database.
        // The "await" keyword ensures that the code waits for the deletion operation to complete before proceeding.
        await Contact.findByIdAndDelete(id);

        // Redirect the client (browser) back to the previous page after successfully deleting the contact.
        return res.redirect('back');
    } catch (err) {
        // If an error occurs during the contact deletion process, handle the error here.
        // Log the error message to the console for debugging purposes.
        console.log("Error while deleting a contact:", err);

        // Send an HTTP 500 status code and a relevant error message to the client (browser).
        res.status(500).send('Error while deleting a contact');
    }
});


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Server running on Port:", port);
    } 
})