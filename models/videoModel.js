var mongoose = require('mongoose');

var Videos = new mongoose.Schema({
  url: String
});

var Video = mongoose.model('Video', Videos);

module.exports = {'model': Video, 'schema': Videos}