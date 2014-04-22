var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Users = new mongoose.Schema({
  email: {type: String, unique: true},
  password: {type: String},
  tempPw: {type: String, default: ""}
});

Users.plugin(timestamps);

var User = mongoose.model('User', Users);

module.exports.model = User;
module.exports.schema = Users;
