const express = require("express"); // import express
const path = require("path");       // import path
const port = 8000;                  // setting port
const app = express();              // create a new instance of express applications

app.set("view engine", "ejs");      // Setting up View engine as ejs
app.set("views", path.join(__dirname, "views"));    // setting up the template folder


app.get("/", (req, res) => {        
    return res.render("home")    // renter the ejs file
})


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Server running on Port:", port);
    } 
})