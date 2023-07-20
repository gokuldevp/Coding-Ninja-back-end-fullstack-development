const express = require("express");
const port = 8000;
const app = express();



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Server running on Port:", port);
    } 
})

