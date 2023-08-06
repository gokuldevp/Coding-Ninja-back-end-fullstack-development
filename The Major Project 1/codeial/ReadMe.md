# To Do App

1. Step 1: = Create the index.js file
2. Step 2: = in the terminal enter 'npm init' and give proper details
3. Step 3: = Create New folders using 'mkdir routes controllers views models config' in the cmd
4. Step 4: = Starting Express
* npm install express in terminal
* Require the express library in the index.js file and setting up the express
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

5. Step 5: = Set the 'nodemon index.js' as start in the script key
```
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
6. Step 6: = Set up .gitignore file
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

7. Step 7: = Set up git and the file to git repository
* git init
* git add .
* git commit -m "Initial commit"
* git remote add origin https://github.com/yourusername/your-repo.git
* git push -u origin master

8. Step 8: = Setup the express router - https://expressjs.com/en/guide/routing.html 
* Create a new index.js file in routes folder
* Add the code for creating router
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

9. Step 9: = Setup the express controller 
* Create a new home_controller.js file in controller foler
* Create controller functions using the below syntax in home_controller.js
```
module.exports.actionName = function (req, res) => {};
```
* call the home controller file in the routes/index.js and use the route.get() method
```
const homeController = require('../controllers/home_controller')
router.get("/", homeController.home);
```

10. Step 10: = Handling multiple routers and controllers
* create a new router in routes folder
* Create a new controller in the controller folder
* in the index.js file in the routes use the router.use() method to access the new router created
```
router.use("/routerName", require("./routerfile"))
```
example:
```
router.use('/users', require('./users'));
```

11. Step 11: = Install EJS and Setupu View engine.
* npm install ejs
* in the main index.js folder setup view engine and the view folder
```
app.set('view engine', 'ejs');
app.set('views', './views');
```

12. Step 12: = Create the home.ejs file in views folder and render the file in home_controller .ejs
```
module.exports.home = (req, res) => {
    let renderVariables = {
        title: "To Do App"
    }
    return res.render('home', renderVariables);
};
```

## Layouts and partials in Views.

### Layouts - [Layouts Documentation](https://www.npmjs.com/package/express-ejs-layouts) 
* also known as templates or master views, are the overall structure or skeleton of a web page.
* They define the common structure and elements that are consistent across multiple pages of a website.
* A layout typically contains the header, footer, navigation menu, and any other elements that are present on most or all pages of the site.

### Partials -  [Partails Documentation](https://ejs.co/) 
* Partials, also known as partial views or includes, are smaller, reusable components of a web page that can be embedded within other views or layouts
* Partials typically represent specific sections or elements of a page that are shared across multiple pages but are not the entire page itself
* Examples of partials include navigation bars, sidebars, widgets, or any other content that appears on multiple pages.

13. Step 13: = Setting up Partials
* Create the partials ejs file in the views folder eg: _header.ejs
* Use the <%- include('filename') -%> keyword to add the partial in other ejs file
* Note: it is not necessary to use _ for partial file name, but used to understand it's a partial
```
<%- include('_header'); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('_footer'); -%>
```

14. Step 14: = Setting Up EJS Layouts
* Install layouts library `npm install express-ejs-layouts`
* Require the express-ejs-layouts library in the main index.js file
* Using the Use keyword - need to be used before the views
```
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts)
```
* create a new ejs file in views folder named layout.ejs
```
|
|_Views
    |_layout.ejs
```
* Create the layout file and add <%- body -%> for adding the content of the file.
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title%></title>
</head>
<body>
    <%- include('_header'); -%>

    <%- body -%>
    
    <%- include('_footer') -%>
</body>
</html>
```
* Remove the redundant part from the other ejs file.

15. Setup static file
* Create a new folder named assets
* Create new sub folders named js, css and images. 
* Using the middleware 'express.static' handles serving static files in Express, Serving static files from the 'assets' directory 
```
app.use(express.static('./assets'));
```
* Create a new file called layout.css and add it as a style sheet in layout.ejs file and test it out.
```
<link rel="stylesheet" href="/css/layout.css">
```

16. Handling Static file for pages
* add the app.set() to extract the style and script subpages into the layout - in the index.js file
* Note: They needed to be added below app.use(expressLayouts)
```
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)
```
* Create a new css file for a page and link it to the respective ejs page
* go to the layout.ejs and add <%- style %> and <%- script %> in the respective places
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title%></title>
    <link rel="stylesheet" href="/css/layout.css">
    <%- style %>
</head>
<body>
    <%- include('_header'); -%>

    <%- body -%>
    
    <%- include('_footer') -%>

    <%- script %>
</body>
</html>
```

17. Step 17- Setup Mongo DB 
* install mongoose using `npm install mongoose`.
* Create a mongoose.js file in config folder.
* setup mongoose.js file
```
// Importing the Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Connecting to the "condial_development" database on the local MongoDB server
mongoose.connect('mongodb://127.0.0.1/condial_development');

// Creating a connection object "db" that represents the connection to the database
const db = mongoose.connection;

// Handling the 'error' event to log errors when connecting to the database
db.on('error', console.error.bind(console, "Error while connecting to DB!"));

// Using the 'once' event to log a success message once the connection is established
db.once("open", function() {
    console.log("connected to Database: Mongo DB!");
});

// Exporting the 'db' connection for use in other parts of the application
module.exports = db;
```

## Manual Authentication

* Step 1: Create a new model in model folder: eg : user.js
* Step 2: Setting up the user schema
```
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    // Creating a new Schema
    email: {
        type: String,       // set the type as string
        required: true,     // make the attribute as manditory
        unique: true,       // make the attribute unique(no dublicates are allowed)
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,        //automatically create create at and updated at fields
});


const User = mongoose.model('User',userSchema);     // Create a new model using the user schema

module.exports = User;
```

* Step 3: Setup and render the sign-in and sign-up pages
-> Create the user_signup.ejs and user_signin.ejs in the views folder
-> Create the Actions for the both in the users_controller
```
module.exports.signin = async (req, res) => {
    let signinVariables = {
        title: 'Codeial | SIGN IN'
    }
    return res.render("user_signin", signinVariables);
}

module.exports.signup = async (req, res) => {
    let signupVariables = {
        title: 'Codeial | SIGN UP'
    }
    return res.render("user_signup", signupVariables);
}
```
-> Route the actions in the users_router
```
router.get('/sign-up', usersController.signup);

router.get('/sign-in', usersController.signin);
```

* Step 4: Setup the sign-in and sign-up post requrest
-> Create the forms in the ejs file
-> Create the action skelton in users_controllers.js
```
// Handing User Signup
module.exports.create = async (req, res) => {
    //To Do Later
}

// Handing User Signin
module.exports.createSession = async (req, res) => {
    //To Do Later
}
```
-> Router the actions in the users_router
```
router.post('/create', usersController.signUp);

router.post('create-session', usersController.signIn);
```

======================================================================================
## Creating and Altering a Cookie
1. Step 1: Install cookie parser package `npm install cookie-parser`
2. Step 2: Require cookie parser in the main index.js file
```
const cookieParser = require('cookie-parser');
```
3. Step 3: use the urlencoded and cookieParser as middleware
```
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
```

note: 
* we can user console.log(req.cookies); in the action to log the cookies
* We can change the value of the cookies at the server using res.cookies('cookie name', value);
======================================================================================

## Manual Authentication - Continues

5. Step 5: Handle User SignUp for post request in the user controller
```
// Controller function to handle user sign-up.
module.exports.create = async (req, res) => {

    // Check if the 'password' and 'confirmpassword' fields match.
    if (req.body.password !== req.body.confirmpassword) {

        // Log a message indicating password mismatch.
        console.log("Password Mismatch");

        // If the passwords do not match, redirect back to the previous page.
        return res.redirect('back');
    }

    // Find a user with the provided email in the database using the 'User' model.
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (!user) {
                // If no user with the provided email exists, create a new user with the form data.

                User.create(req.body)
                    .then((user) => {
                        // On successful user creation, redirect to the '/users/sign-in' page to prompt the user to sign in.
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => {
                        // If there's an error while creating the user, log the error and return.
                        console.log("Error while creating user while signup!");
                        return;
                    });

            } else {
                // If a user with the same email already exists, redirect back to the previous page.
                console.log("User Already Exists");
                return res.redirect('back');
            }
        })
        .catch((err) => {
            // If there's an error while finding the user, log the error and return.
            console.log("Error in finding user in signup!");
            return;
        });
};
```

6. Step 6: Update the user router for the post request.
```
router.post('/create', usersController.create);
```

7. Step 7: Handle User SignUp for post request in the user controller