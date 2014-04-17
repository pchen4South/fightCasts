var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Events = new mongoose.Schema({
  name: String,
  country: String,
  startDate: Date,
  endDate: Date
});

Events.plugin(timestamps);

var Event = mongoose.model('Event', Events);

module.exports.model = Event;
module.exports.schema = Events;
