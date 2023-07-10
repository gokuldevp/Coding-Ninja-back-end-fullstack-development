const operations = require("./modulesfile.js"); // we need to user require keyword to import the module.

console.log(operations.sub(1,2));
console.log(operations.div(1,2));
console.log(operations.add(1,2));  //TypeError: operations.add is not a function
console.log(operations.mul(1,2));  //TypeError: operations.mul is not a function