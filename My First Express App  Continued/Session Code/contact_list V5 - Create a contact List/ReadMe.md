# Creating the contact list

Step 1: Create a list containing the the user information in the js file.

```
var contactList = [
    {
        name: "Gokul Dev P",
        mobile: "+912937467574"
    }
]
```
Step 2: Add the list as a variable to the responce.render in the get method

```
app.get("/", (req, res) => {        
    // The file create a new object and add it as a variable to render
    let homeVariables = {
        title : "My Contact List",
        heading: "My Contact Lists",
        contact_list: contactList
    }
    return res.render("home", homeVariables)    // renter the ejs file
});
```

Step 3: in the EJS file use a for loop to add the contact information in a list.

```
    <ul>
        <% contact_list.forEach((contact) => { %>
            <li>
                <p>Name: <%= contact.name %></p>
                <p>Mobile: <%= contact.mobile %></p>
                
            </li>
        <%})%>
    </ul>   
```

=================================================================

# sending the data to the Server

Step 1: Create a Form for the post method for user to add the contact list.
```
    <form action="/create-contact" method="post">
        <label for="name">Name: </label>
        <input type="text" name="name" id="name" placeholder="Enter your name..." required>

        <label for="mobile">Mobile:</label>
        <input type="tel" name="mobile" id="mobile" placeholder="Enter Your Mobile Number..." required>

        <button type="submit">Add Contact</button>
    </form>
```

Step 2: Create a post request to handle the post form
.redirect(): This is a method of the res object, and it is used to instruct the client's web browser to redirect to a different URL.

```
app.post(("/create-contact"), (req, res) => {
    res.redirect("/");
})
```

Step 3: setting up middleware in an Express.js application to handle URL-encoded form data

* use(): This is a method in the Express application that is used to set up middleware. 
* express.urlencoded: This is a built-in middleware provided by the express module. It is used to parse incoming request bodies with URL-encoded data. It is commonly used to parse form data submitted via POST requests.
* The extended: true option allows you to parse nested objects in the URL-encoded data.
```
app.use(express.urlencoded({ extended: true }));
```

Step 4: Handle post request
* back - it instructs the browser to go back to the previous page in its history.
```
app.post(("/create-contact"), (req, res) => {
    contactList.push(req.body)
    return res.redirect("back");
});
```

