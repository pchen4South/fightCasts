var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var People = new mongoose.Schema({
  name: String,
  country: String
});
People.plugin(timestamps);

var Person = mongoose.model('Person', People);

module.exports = {'model': Person, 'schema': People}