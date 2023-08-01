# To Do App

1. Create the index.js file
2. in the terminal enter 'npm init' and give proper details
3. Create New folders using 'mkdir routes controllers views models config' in the cmd
4. Starting Express
-> npm install express in terminal
-> Require the express library in the index.js file and setting up the express
```
const express = require('express');
const app = express()
const port = 8000;
app.listen(port, (err)=>{
    if(err){
        console.log(`Error while running the server: ${err}`)
    }
    console.log(`Serrver is running on the port: ${port}`)
});
```

5. Set the 'nodemon index.js' as start in the script key
```
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
6. Set up .gitignore file
```
# ignore compiled files
*.class
*.o
*.pyc

# Ignore IDE-specific folders
.idea/
.vscode/

# Ignore dependency management files
node_modules/
package-lock.json

```

7. Set up git and the file to git repository
-> git init
-> git add .
-> git commit -m "Initial commit"
-> git remote add origin https://github.com/yourusername/your-repo.git
-> git push -u origin master

8. Setup the express router - https://expressjs.com/en/guide/routing.html 
-> Create a new index.js file in routes folder
-> Add the code for creating router
```
const express = require('express');
const router = express.Router();


module.exports = router;;
```
> using the app.use() middleware call the router in index.js file in the root folder
```
// middleware to use router
app.use("/", require('./routes'))
```

9. Setup the express controller 
-> Create a new home_controller.js file in controller foler
-> Create controller functions using the below syntax in home_controller.js
```
module.exports.actionName = function (req, res) => {};
```
-> call the home controller file in the routes/index.js and use the route.get() method
```
const homeController = require('../controllers/home_controller')
router.get("/", homeController.home);
```

10. Handling multiple routers and controllers
-> create a new router in routes folder
-> Create a new controller in the controller folder
-> in the index.js file in the routes use the router.use() method to access the new router created
```
router.use("/routerName", require("./routerfile"))
```

11. Install EJS and Setupu View engine.
-> npm install ejs
-> in the main index.js folder setup view engine and the view folder
```
app.set('view engine', 'ejs');
app.set('views', './views');
```

12. Create the home.ejs file in views folder and render the file in home_controller .ejs
```
module.exports.home = (req, res) => {
    let renderVariables = {
        title: "To Do App"
    }
    return res.render('home', renderVariables);
};
```