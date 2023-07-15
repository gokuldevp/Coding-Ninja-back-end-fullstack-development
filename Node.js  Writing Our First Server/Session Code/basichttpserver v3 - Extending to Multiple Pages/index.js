const http = require("http");   //import the http module
const port = 8000;              //adding a port number
const fs = require("fs");       // import fs module - user to read/write from files

let requestHandler = (request, response) => {
    //Function to handle the server request and response when rendering html when html is in a seprate file
    console.log(request.url);  // log the url part of the request, the area after the port

    // sets the status code to 200 (indicating a successful response) and specifies that the content being
    // sent back to the client is in HTML format. This header informs the client's web browser how to 
    // interpret the data received from the server.
    response.writeHead(200, {'content-type': 'text/html'});  

    const indexpath = "./index.html";    //Path of the Html file
    const profilepath = "./profile.html";
    const errorPath = "./404.html";
    let filePath;

    switch (request.url){
        case "/":
            filePath = indexpath;
            break;

        case "/profile":
            filePath = profilepath;
            break;

        default:
            filePath = errorPath;
    }


    fs.readFile(filePath, (err, data) => {
        // Read the html file path, if the path exists render the html file content, else render the error
        if(err) {
            console.log(err);
            return response.end("<h1>"+err+"</h1>")
        }
        return response.end(data);
    }); 
}

const server = http.createServer(requestHandler);  // createing http server request

server.listen(port, (err) => {
    if (err){
        console.log(err);           // if any error occures, print the error
        return;
    }
    console.log("Server is currently running at port:", port);     // print the success message
});

