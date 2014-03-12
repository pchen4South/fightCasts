var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Videos = new mongoose.Schema({
  name: String,
  url: String
});

Videos.plugin(timestamps);

var Video = mongoose.model('Video', Videos);

module.exports = {'model': Video, 'schema': Videos}
