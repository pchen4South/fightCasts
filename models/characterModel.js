var mongoose = require('mongoose');

var Characters = new mongoose.Schema({
  name: String,
  game: String
});

var Character = mongoose.model('Character', Characters);

module.exports = {'model': Character, "schema": Characters};