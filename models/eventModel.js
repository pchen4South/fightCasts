var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Events = new mongoose.Schema({
  name: String,
  country: String,
  date: String
});
Events.plugin(timestamps);

var Event = mongoose.model('Event', Events);
module.exports = {'model': Event, 'schema': Events}