# Accessing Static Files

Step 1: Create a new folder called assets for adding the static file

project_name/
├── assets/
│   ├── css/
│   │   └── home.css
│   ├── images/
│   │   └── image1.jpg
│   │   └── image2.png
│   │   └── ...
│   └── js/
|       └── home.js
└── views/
    └── home.js

Step 2: Use the middleware that serves static files, 
```
app.use(express.static("assets"));
```

Step3: A the respective static file using the sub folder name in ejs file
```
<link rel="stylesheet" href="/css/home.css">
```