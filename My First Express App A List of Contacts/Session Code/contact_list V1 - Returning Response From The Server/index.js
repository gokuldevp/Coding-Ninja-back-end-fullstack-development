const express = require("express"); // import express
const port = 8000;                  // setting port
const app = express();              // create a new instance of express applications


app.get("/", (req, res) => {        // Routes HTTP GET requests to the specified path with the specified callback functions.
    // basic dependancy are automatically handled eg: content type
    res.send("<h1>Hi there<h1>")    // responding with sending data to the request.
})

app.get("/profile", (req, res) => {        // Routes HTTP GET requests to the specified path with the specified callback functions.
    // basic dependancy are automatically handled eg: content type
    res.send("profile")    // responding with sending data to the request.
})

app.get("/*", (req, res) => {        // Routes HTTP GET requests to the specified path with the specified callback functions.
    // basic dependancy are automatically handled eg: content type
    res.send("<h1>Error<h1>")    // responding with sending data to the request.
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Server running on Port:", port);
    } 
})