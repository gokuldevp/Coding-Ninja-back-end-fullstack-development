# Template Engine - EJS
Find the list of template engines for Express : https://expressjs.com/en/resources/template-engines.html

Step 1: Install Ejs
```
npm install ejs
```

Step 2: Setup Ejs as View engine
```
app.set("view engine", "ejs"); 
```

Step 3: set the path for views(Templates) folder(folder containing the ejs file)
```
const path = require("path")
app.set("views", path.join(__dirname, "views")); 
```
where __dirname gives the the directory name of the current module.

Step 4: Render the ejs file use Render method in responce
```
app.get("/", (req, res) => {        
    return res.render("home") 
})
```


