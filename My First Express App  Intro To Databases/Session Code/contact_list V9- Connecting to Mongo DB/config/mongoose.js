// require the library
const mongoose = require('mongoose');

//connect to the db
mongoose.connect("mongodb://127.0.0.1/contact_list_db");

// acquire the connection (to check if it is successfull)
const db = mongoose.connection;

//error - print the message
db.on('error', function(err) { console.log(err.message); });

//Db up and running - print the message
db.once('open',()=>{
    console.log("successfully connected to the db");
});

// main().catch(err => console.log(err));

// async function main() {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1/contact_list_db');
//     console.log('Connected to MongoDB!');

//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//   }
// }



