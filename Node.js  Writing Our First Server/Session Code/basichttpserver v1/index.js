const http = require("http");   //import the https module
const port = 8000;              //adding a port number


let requestHandler_1 = (request, response) => {
    //Function to handle the server request and response
    console.log(request.url);  // log the url part of the request, the area after the port

    response.end('Gotcha! 001');  //Print Gatcha on the screen
}

let requestHandler_2 = (request, response) => {
    //Function to handle the server request and response
    console.log(request.url);  // log the url part of the request, the area after the port

    // sets the status code to 200 (indicating a successful response) and specifies that the content being
    // sent back to the client is in HTML format. This header informs the client's web browser how to 
    // interpret the data received from the server.
    response.writeHead(200, {'content-type': 'text/html'});  

    // response.end(body); is used in server-side JavaScript to send the HTTP response body to the client and end the response.
    response.end('<h1>Hi Gokul</h1>');  
}

const server = http.createServer(requestHandler_2);  // createing http server request

server.listen(port, (err) => {
    if (err){
        console.log(err);           // if any error occures, print the error
        return;
    }
    console.log("Server is currently running at port:", port);     // print the success message
});

