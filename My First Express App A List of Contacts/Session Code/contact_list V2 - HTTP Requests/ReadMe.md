# HTTP Requests

Step 1: Console log the req -  the request 
```
app.get("/", (req, res) => {
    console.log(req)                // Browser request
    res.send("<h1>Hi there<h1>") 
})
```

UTF-8 is an encoding system for Unicode. It can translate any Unicode character to a matching unique binary string, and can also translate the binary string back to a Unicode character.
defaultEncoding: 'utf8',

Local host details
'localhost:8000'

which broser engine is sending
'User-Agent',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',

what type of data can be accepted
'Accept',
'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',

Method and Description
1	GET 
The GET method is used to retrieve information from the given server using a given URI. Requests using GET should only retrieve data and should have no other effect on the data.

2	HEAD
Same as GET, but it transfers the status line and the header section only.

3	POST 
POST is used to submit data to the server to create a new resource or trigger a specific action on the server. It is typically used for creating new records or adding data to an existing collection.

4	PUT
PUT is used to update or replace an existing resource on the server. It is typically used when you want to modify the data of an existing record entirely.

5   PATCH
The PATCH method is used to apply partial updates to a resource on the server. It is used when you want to make small modifications to an existing resource without sending the entire updated representation of the resource.

6	DELETE
Removes all the current representations of the target resource given by URI.

7	CONNECT
Establishes a tunnel to the server identified by a given URI.

8	OPTIONS
Describe the communication options for the target resource.

9	TRACE
Performs a message loop back test along with the path to the target resource.