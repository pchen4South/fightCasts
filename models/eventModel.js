var mongoose = require('mongoose');

var Events = new mongoose.Schema({
  name: String,
  country: String,
  date: String
});

var Event = mongoose.model('Event', Events);

module.exports = {'model': Event, 'schema': Events}