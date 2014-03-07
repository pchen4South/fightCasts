var mongoose = require('mongoose');

var People = new mongoose.Schema({
  name: String
});

var Person = mongoose.model('Person', People);


module.exports = {'model': Person, 'schema': People}