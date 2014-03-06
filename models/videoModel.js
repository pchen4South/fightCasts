var mongoose = require('mongoose');

var Videos = new mongoose.Schema({
  name: String,
  url: String
});

var Video = mongoose.model('Video', Videos);

module.exports = {'model': Video, 'schema': Videos}
