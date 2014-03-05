var mongoose = require('mongoose').connect('mongodb://localhost:27017/fightCasts');

var Players = new mongoose.Schema({
  name: String,
  ObjectId: mongoose.Schema.ObjectId
});

var Player = mongoose.model('Player', Players);

module.exports = {'model': Player, 'schema': Players}