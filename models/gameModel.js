var mongoose = require('mongoose');

var Games = new mongoose.Schema({
  name: String,
  nickname: String
});

var Game = mongoose.model('Game', Games);

module.exports = {'model': Game, 'schema': Games};
