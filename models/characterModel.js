var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Characters = new mongoose.Schema({
  name: String,
  game: String
});
Characters.plugin(timestamps);

var Character = mongoose.model('Character', Characters);

module.exports = {'model': Character, "schema": Characters};