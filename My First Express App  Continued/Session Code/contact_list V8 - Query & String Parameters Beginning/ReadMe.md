# Query & String Parameters

1. Query Parameters:
* In Express, query parameters are accessible through the req.query object. Express automatically parses the query string from the URL and makes it available as an object in the req.query. Example Assuming the URL is: http://example.com/user?id=123&name=John

```
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  const userId = req.query.id;
  const userName = req.query.name;
  
  console.log(userId);    // Output: "123"
  console.log(userName);  // Output: "John"
  
  // Rest of your code here...
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

1. String Parameters:
* When working with string parameters, you can define routes with parameters in the URL. Express uses a colon : followed by a parameter name to define a parameterized route. You can access the string parameters using the req.params object. For example:

1. Assuming the URL is: http://example.com/user/123/John

*  In this example, the :id and :name in the route act as placeholders for the actual values in the URL. Express automatically extracts these values and makes them available in the req.params object.

```
const express = require('express');
const app = express();

app.get('/user/:id/:name', (req, res) => {
  const userId = req.params.id;
  const userName = req.params.name;
  
  console.log(userId);    // Output: "123"
  console.log(userName);  // Output: "John"
  
  // Rest of your code here...
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```


## Deleting a contact from the list
Step 1: Find the contact from the list based on the mobile number
```
app.get("delete-contact/:mobile", (req, res) => {
    let mobile = req.params.mobile;
    let contactIndex = contactList.findIndex(contact => contact.mobile == mobile);  // find the index of the of the contact with mobile number
})
```

Step 2: remove the contact from the list using splice

```
    if (contactIndex != -1){ 
        contactList.splice(contactIndex, 1);
    }
```