==================================== 
#Node.js : Writing Our First Server

Step 1: in the Terminal write - Need to be performed in the working directory
'''
npm init
'''

Step 2: fill the below details

```
package name: (basichttpserver) 
version:(1.0.0) 
description: my first server                                      
entry point: (index.js)                                                                                                                                             
test command:                                                                                                                                                     
git repository: https://github.com/gokuldevp/basic-http-server.git
keywords:                                                                         
author: Gokul Dev P                                                                                                                                       
license: (ISC) MIT  
```

Step 3: write the code

Step 4: run the file using the below comment
```
node filename.js
```

Step 5: check if the server is running in the browser for the given port
localhost: port
eg: http://127.0.0.1/:8000 

==================================================================================

Handling Request and Responce
Step 1: Create a new function with 2 argument - request and response.
-> In the function use request argument to handle the request.
-> In the function use responce argument to handle the responce.
Example:
```
let requestHandler = (request, response) => {
    //Function to handle the server request and response
    console.log(request.url);  // log the url part of the request, the area after the port

    response.end('Gotcha!');  //Print Gatcha on the screen
}
```

Step 2: Add the new function as the parameter of the createServer function

===================================================================================

Reading and Writing Html file.
We user the module fs for handling file.

Step 1: Import the fs module
```
const fs = require("fs");
```
Step 2: Create a new function with 2 argument - request and response. for handling files

Step 3: Add the path of the Html file
```
const path = "./.index.html"; 
```
Step 4: Using the fs module to handle the html file. - 2 arguments - path and function
```
fs.readFile(path, (err, data) => {
    if(err) {
        console.log(err);
        return response.end("<h1>"+err+"</h1>")
    }
    return response.end(data);
}); 
``` 