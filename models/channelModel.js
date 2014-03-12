var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Channels = new mongoose.Schema({
  name: String
});
Channels.plugin(timestamps);

var Channel = mongoose.model('Channel', Channels);

module.exports = {'model': Channel, 'schema': Channels};