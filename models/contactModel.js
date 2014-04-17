var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Contacts = new mongoose.Schema({
  email: {type: String, unique: true}
});

Contacts.plugin(timestamps);

var Contact = mongoose.model('Contact', Contacts);

module.exports.model = Contact;
module.exports.schema = Contacts;
