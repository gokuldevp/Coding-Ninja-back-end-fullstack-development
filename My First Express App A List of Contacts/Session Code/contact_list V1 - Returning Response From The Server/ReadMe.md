#My First Express App :: A List of Contacts!

Step 1: Create a new node js project

Step 2: Install Express

```
npm install express
```

Step 3: import the express in the file
```
const express = require("express");
const app = express;
```

Step 4: create the function to run the app and run the programm.

=================================================================================
Returning Response From The Server

Step 1: Routes HTTP GET requests to the specified path with the specified callback functions.
```
app.get(path, callback [, callback ...])
```
```
app.get("/", (req, res) => {
})
```

Step 2: handle user responce using send to render the data
```
app.get("/", (req, res) => {        // Routes HTTP GET requests to the specified path with the specified callback functions.
    // basic dependancy are automatically handled eg: content type
    res.send("<h1>Hi there<h1>")    // responding with sending data to the request.
})
```