var mongoose = require('mongoose');

var Players = new mongoose.Schema({
  name: String
});

var Player = mongoose.model('Player', Players);

module.exports = {'model': Player, 'schema': Players}