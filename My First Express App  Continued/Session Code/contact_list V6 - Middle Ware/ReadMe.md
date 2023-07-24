# Middle ware

In Node.js, middleware is a way to intercept and process HTTP requests and responses as they pass through the application's pipeline. It allows developers to add functionalities and processing logic in a modular and reusable manner, making it easier to manage and maintain complex server-side applications.

1. In Express.js, which is a popular web framework for Node.js, 
2. middleware functions are used to handle HTTP requests and responses. 
3. A middleware function has access to the request (req) and response (res) objects
4. A next function that should be called to pass control to the next middleware in the stack.

Eg:
```
// Custom Middle Ware 1
const middleWare1 = (req, res, next) => {
    console.log("First Middle ware created!!!")
    next()
}
app.use(middleWare1)
```