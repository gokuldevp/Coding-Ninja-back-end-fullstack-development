# Mongo DB

Step 1: Download and Install Mango DB
Step 2: Add the mongo DB to the system environment variable
Step 3: check if properly installed using ` mongod --version` in cmd

## Connecting to Mongo DB
Step 1: install mongoose 'npm install mongoose'
Step 2: Create a new folder named config.
Step 3: Create a new file called mongoose.js inside config
Step 4: import the mongoose to the file
```
const mongoose = require('mongoose');
```
Step 5: Connect to the Mongoose db
```
mongoose.connect("mongodb://127.0.0.1/contact_list_db");
```

Step 6: acquire the connection
```
const db = mongoose.connection;
```
Step 7: Print error
```
db.on('error', function(err) { console.log(err.message); });
```

Step 8: Print the success message
```
db.once('open',()=>{
    console.log("successfully connected to the db");
});
```

Step 9: Include the db while running the server
* require the mongoose.js in the index.js - needed to be added above require express
```
const db = require('./config/mongoose');
```

## Creating DB Schema

Step 1: Create a New Folder called models
Step 2: Create a New js in models
```
--> models
    |
    -> contact.js
```
Step 3: Import the mongoosee module
```
// require the library
const mongoose = require('mongoose');
```

Step 4: Create a new Schema for contact
[SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
```
const contactSchema = new mongoose.Schema({
    name: {type:String, required: true},
    mobile: {type:String, required: true}
});
```

Step 5: create a Mongoose model. A model is a constructor compiled from the schema, and it provides an interface to interact with a MongoDB collection
```
const Contact = mongoose.model('Contact', contactSchema);
```

Step 6: Export the module.
```
module.exports = Contact;
```

## Populating the DB

Step 1: Update the post create function to a async function.
```
app.post(("/create-contact"), async (req, res) => {});
```
Step 2: Create a try catch to for catching error

Step 3: in try block create a new contact in the database using the Mongoose model "Contact".
```
const newContact = await Contact.create({ name: req.body.name, mobile: req.body.mobile });
```
Step 4: Redirect back to the if there is no error
```
return res.redirect('back');
```
Step 5: in the catch block, res with the error
```
res.status(500).send('Error creating contact');
```

## Fetching data from the DB

Step 1: Update the get create function to a async function.
```
app.get(["/", "/home.ejs"], async (req, res) => {});
```
Step 2: Fetch all contacts from the database and store them in the "contactList" variable.
```
let contactList = await Contact.find({});
```
Step 3: Create an object "homeVariables" that holds data to be passed to the EJS template.
```
let homeVariables = {
    title: "My Contact List",         // The title for the homepage
    heading: "My Contact Lists",      // The heading to display on the page
    nav_item: ["Add New Contact"],    // An array of navigation items (e.g., for a navigation bar)
    contact_list: contactList         // The list of contacts fetched from the database
};
```
Step 4: Render the "home" EJS file and pass the "homeVariables" object as data to the template.
```
return res.render("home", homeVariables);
```

## Deleting the contact.
Step 1: Go to the home.ejs file and change the mobile to _id in url
```
<a href="/delete-contact/<%= contact._id %>"></a>
```
Step 2: Update the get create function to a async function.
```
app.get("/delete-contact/:id", async (req, res) => {});
```
Step 3: Extract the contact ID from the request parameters
```
let id = req.params.id;
```
Step 4: Attempt to find the contact by ID and delete it from the database.
```
await Contact.findByIdAndDelete(id);
```
Step 5: Redirect the client (browser) back to the previous page after successfully deleting the contact.
```
return res.redirect('back');
```
