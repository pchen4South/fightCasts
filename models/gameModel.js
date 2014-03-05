var mongoose = require('mongoose');

var Games = new mongoose.Schema({
  name: String
});

var Game = mongoose.model('Game', Games);

module.exports = Game;