const express = require("express"); // import express
const path = require("path");       // import path
const port = 8000;                  // setting port
const app = express();              // create a new instance of express applications

app.set("view engine", "ejs");      // Setting up View engine as ejs
app.set("views", path.join(__dirname, "views"));    // setting up the template folder
app.use(express.urlencoded({ extended: true }));    // is setting up middleware in an Express.js application to handle URL-encoded form data.

let num = 1;

// Custom Middle Ware 1
const middleWare1 = (req, res, next) => {
    num ++;
    console.log("First Middle ware created!!!", num);
    next();
}

// Custom Middle Ware 2
const middleWare2 = (req, res, next) => {
    num++;
    console.log("Second Middle ware created!!!", num);
    next();
}

app.use(middleWare1);
app.use(middleWare2)

var contactList = [
    {
        name: "Gokul Dev P",
        mobile: "2937467574"
    },
];

app.get(["/", "/home.ejs"], (req, res) => {        
    // The file create a new object and add it as a variable to render
    let homeVariables = {
        title : "My Contact List",
        heading: "My Contact Lists",
        nav_item: ["Add New Contact"],
        contact_list: contactList
    }
    return res.render("home", homeVariables)    // renter the ejs file
});

app.get("/add_contact.ejs", (req, res) => {        
    // The file create a new object and add it as a variable to render
    let homeVariables = {
        title : "Add New contact",
        heading: "Add New Contact",
        nav_item: ["My Contact List"],
        contact_list: contactList
    }
    return res.render("add_contact", homeVariables)    // renter the ejs file
});

app.post(("/create-contact"), (req, res) => {
    //add a new contact to the contactList in case a person submit a form.
    contactList.push(req.body)
    return res.redirect("back");
});

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Server running on Port:", port);
    } 
})