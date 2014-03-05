var mongoose = require('mongoose');

var Videos = new mongoose.Schema({
  name: String
});

var Video = mongoose.model('Video', Videos);

module.exports = Video;