# Debugging and Playing with EJS

## Debugging
### For syntax error we will get the below information.
1. Error line number
2. error type
3. Error line

Eg:
```
D:\CODINGNINJAS\Back End - Full stack development\My First Express App A List of Contacts\Session Code\contact_list V4 - Debug, Play with ejs\index.js:10
app.get("/, (req, res) => {        
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^

SyntaxError: Invalid or unexpected token
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1178:20)
    at Module._compile (node:internal/modules/cjs/loader:1220:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at Module._load (node:internal/modules/cjs/loader:960:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.16.1
[nodemon] app crashed - waiting for file changes before starting...
```

### For Logical Error we can use a counsole log to print the logic in with the help of a variable
```
console.log(logicVariable).
```

# Playing with EJS

Making the ejs file dynamic

Step 1: Create a new object and add it as a parameter in render.
```
    app.get("/", (req, res) => {        
        let homeVariables = {
            title : "My Contact List",
            heading: "My Contact Lists"
        }
        return res.render("home", homeVariables)
    })
```

Step 2: Use the variable in the ejs file to make that part dynamic

```
    <title>
        <%= title %>
    </title>
```

Note: 
1. If there is printing involved we need to use = 
eg: <%= title %>
2. Else just <%  %>

Step 3: Create For loop.

```
<% for (let i=0; i<10; i++) {%>
    <li>
    <%= i%>
    </li>
    <%}%>
```

Step 4: Creating if condition.

```
    <% if (i%2===0) {%>
    <li>
        <%= i %> Even
    </li>
    <% } else { %>

    <li>
        <%= i %> Odd
    </li>
    <% } %>
```
