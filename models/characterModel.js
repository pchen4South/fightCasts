var mongoose = require('mongoose');

var Characters = new mongoose.Schema({
  name: String
});

var Character = mongoose.model('Character', Characters);

module.exports = Character;