const express = require('express')

const port = 8000;
const app = express();


app.listen(port, (err)=> {
    if(err){
        console.log(`Error while running the server ${err}`);
    }
    console.log(`Server is running successfully at port ${port}`)
})