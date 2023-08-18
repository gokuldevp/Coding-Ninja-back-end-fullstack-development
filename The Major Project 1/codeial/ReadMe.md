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
## Authentication Using Passport js

### Setting up Passport.js

[password js documentation](https://www.passportjs.org/)
[Password js local authenticaion doc](https://www.passportjs.org/packages/passport-local/)

* Step 1: install passport js `npm install passport-local`.
* Step 2: Create a new js file called 'passport-local-strategies.js' in the config folder
* Step 3: Import passport module to the page
* Step 4: Import passport local strategy to the file
* Step 5: Import the Model to the file
* Step 6: Authenticate the user
```
// Configure passport to use a LocalStrategy for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import the User model

// Set up the LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email' // Use the 'email' field for username
    },
    // This function is called during authentication
    (email, password, done) => {
        // Find a user with the provided email
        User.findOne({email:email})
        .then((user) => {
            if (!user || user.password != password) { 
                console.log("Invalid User");
                return done(null, false); // Authentication failed
            }
            return done(null, user); // Authentication successful
        })
        .catch((err) => {
            console.log('Error in finding user --> Passport');
            return done(err); // Return error if there's a problem
        })
    }
));
```

* Step 7: serializing the user to decide which key is needed to be kept in the cookies
```
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user by storing their ID in the session cookies
});
```

* Step 8: Deserializing the user from the key stored in the cookies
```
// Deserializing the user from the key stored in the cookies
passport.deserializeUser((id, done) => {
    // Find the user based on the stored ID
    User.findOne({ _id: id})
    .then((user) => {
      // if succeeded do this block of code
      return done(null, user);
    })
    .catch((err) => {
      // catch error
      console.log('Error in finding user --> Passport');
      return done(err);
    });
});
```
Step 9: export the password
```
module.exports = passport;
```

### Express sessions and using passport js

* Step 1: install express sessions `npm install express-session`
* Step 2: Import required modules for user session management and authentication in 'index.js' main file
```
const session = require('express-session'); // Handle user session data
const passport = require('passport'); // Manage authentication
const passportLocal = require('./config/passport-local-strategies'); // Import local authentication strategies
```

* Step 3: Configure session management middleware for the application [express session doc](https://www.npmjs.com/package/express-session)
Note: session management middleware need to be used after setting up views
```
app.use(session({
    name: 'codeial',                 // Name of the session cookie
    secret: 'abcdef',                // Secret used to sign and encrypt session data
    saveUninitialized: false,        // Don't save uninitialized sessions
    resave: false,                   // Don't save session if it hasn't been modified
    cookie: {
        maxAge: (1000 * 60 * 100)    // Maximum age of the session cookie (in milliseconds)
    }
}));
```

* Step 4: Initialize and set up Passport.js for authentication in index.js as middleware
Note: This need to be done before routes
```
app.use(passport.initialize());   // Initialize Passport authentication
app.use(passport.session());      // Manage user sessions with Passport
```

* Step 5: Handle Create session in user_controllers
```
// Handing User Signin
module.exports.createSession = async (req, res) => {
    return res.redirect('/');
}
```

* Step 6: require the passport in the users_router.js
```
const passport = require('passport');
```

* Step 7: use passport as a middleware to authenticate create-session
```
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
```

### Setting current authenticated user

* Step 1: Create the passport.checkAuthentication and passport.setAuthenticationUser in passport-local-strategies.js
```
// Check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is signed in then pass on the request to the next function(controller's actions) 
    if (req.isAuthenticated()){
        return next();
    }
    
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticationUser = (req, res, next) => {
    if (req.isAuthenticated()){
        // req.user contains the current signed in user for the session cookies and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next()
}
```
* Step 2: Route that requires authentication in routers file
```
router.get(['/profile'],passport.checkAuthentication, usersController.profile);
```

* Step 3: Use the custom middleware in index.js file to ensure that the authenticated user information is available in requests
```
app.use(passport.setAuthenticationUser);
```

============================================================================================================================
### Passing User data to views and restricting page access(Making the signin and signup page not available for a login user)

* Step 1: Use req.isAuthenticated() in to redirect the login user to the profile page while signin/signup

```
// Render the Signin page
module.exports.signIn = async (req, res) => {

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    let signinVariables = {
        title: 'Codeial | SIGN IN'
    }
    return res.render("user_signin", signinVariables);
}

// Render the Signup page
module.exports.signUp = async (req, res) => {
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    let signupVariables = {
        title: 'Codeial | SIGN UP'
    }
    return res.render("user_signup", signupVariables);
}
```

* Step 2: Update the Profile page to user the user information in the render page page
```
<h1>Profile | <%= user.name %></h1>
<p><%= user.name%></p>
<p><%= user.email%></p>
```

=======================================================================================================================
### Setting up Mongo store for session cookies
* Step 1: install mongo store `npm install connect-mongo` [connect-mongo doc](https://www.npmjs.com/package/connect-mongo)
* Step 2: Add the mongo store to the main index.js file

```
const MongoStore = require('connect-mongo');
```

* Step 3: Add the mongo store to the session middleware
```
// Configure session management using Express.js middleware
app.use(session({
    name: 'codeial',                 // Name of the session cookie
    secret: 'abcdef',                // Secret used to sign and encrypt session data
    saveUninitialized: false,        // Don't save uninitialized sessions
    resave: false,                   // Don't save session if it hasn't been modified
    cookie: {
        maxAge: (1000 * 60 * 100)    // Maximum age of the session cookie (in milliseconds)
    },
    // Use MongoStore to save the session cookie in the MongoDB database
    store: MongoStore.create({
        // Provide the URL for connecting to the MongoDB database
        mongoUrl: 'mongodb://127.0.0.1/condial_development'
    },
    // Callback function executed after attempting to establish the connection
    (err) => {
        // If an error occurs during the connection, log the error
        // Otherwise, indicate successful connection
        console.log(err || "Mongo store is connected successfully!")
    }
    )
}));
```

### Creating Sign out
* Step 1: create link for signout (_header.ejs) / also makeing it visible only if the user is login in
```
<div class="navbar">
    <a href="/">Home</a>
    <% if (locals.user) { %>
        <a href="/users/profile"><%= user.name%></a>
        <a href="/users/sign-out">Sign Out</a>
    <% } else { %>
        <a href="/users/sign-up">Sign Up</a>
        <a href="/users/sign-in">Sign In</a> 
    <% } %>
</div>
```

* Step 2: Create Action for the signout in users controller
```
// Handle signout 
module.exports.signOut = async (req, res) => {
    // landle logout
    req.logout((err) => {
        if (err) {
            // Handle any error that might occur during logout
            console.error(err);
        }
        return res.redirect('/');
    });
}
```

* Step 3: Create the route in users routes

```
router.get('/sign-out', usersController.signOut);
```

=========================================================================================================================
### Using SASS/ SCSS file in node- express
* Step 1: Install sass `npm install sass`
* Step 2: config setup fund `npm config set fund false`
* step 3: Add sas-watch in scripts in the package.json
```
"sass-watch": "sass --no-source-map --watch assets/scss/:assets/css/",
```
* Step 4: Create a scss folder in the assets folder
* Step 5: Create the scss file in the scss folder
* Step 6: use the below comment in the terminal to run the scss file
```
npm run sass-watch
```
Note: this will convert the scss file to a css file and add it to the css folder, after which we can directly use the detials

==========================================================================================================================
### Creating Schema for Posts

* Step 1: create a new models called post.js
* Step 2: create a new schema in post.js for handing posts
```
const mongoose = require('mongoose');

// Define the structure of a 'Post' using a Mongoose schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This refers to the 'User' model for associating posts with users
        required: true
    }
}, {
    timestamps: true // This automatically adds 'createdAt' and 'updatedAt' fields to each document
});

// Create a 'Post' model based on the defined schema
const Post = mongoose.model('Post', postSchema);

// Export the 'Post' model to be used in other parts of the application
module.exports = Post;
```

* Step 3: create a form for submitting the user post in home.ejs
```
<section id="feed-posts">
    <h4>
        Posts
    </h4>

    <form action="/create-post" id="new-post-form" method="post">
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Type here..."></textarea>
        <input type="submit" value="post">
    </form>
</section>
```

* Step 4: Create a action and controller for the post request in home controller and index.js(routes)
```
module.exports.createPost = async (req, res) => {
    return res.redirect('/');
}
```
```
router.post('/create-post',passport.checkAuthentication,homeController.createPost);
```

* In the createPost Action, add the user post in the db when ever a user is post something
```
module.exports.createPost = async (req, res) => {
    // Add the post in the DB
    Post.create({
        content: req.body.content,
        user: req.user._id,
    })
    .then((post) => {
        // On successful user creation of post, redirect 'back' page.
        return res.redirect('back');
    })
    .catch((err) => {
        // If there's an error while creating the Post, log the error and return.
        console.log("Error while creating user post!");
        return;
    });
}
```
