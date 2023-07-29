// require the library
const mongoose = require('mongoose');

// Create a new schema for contacts
const contactSchema = new mongoose.Schema({
    name: {type:String, required: true},
    mobile: {type:String, required: true}
});

//create a Mongoose model
const Contact = mongoose.model('Contact', contactSchema);

//Export the contact
module.exports = Contact;