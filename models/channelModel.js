var mongoose = require('mongoose');

var Channels = new mongoose.Schema({
  name: String
});

var Channel = mongoose.model('Channel', Channels);

module.exports = {'model': Channel, 'schema': Channels};