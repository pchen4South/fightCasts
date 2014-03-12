var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Games = new mongoose.Schema({
  name: String,
  nickname: String,
  _characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }]
});
Games.plugin(timestamps);

var Game = mongoose.model('Game', Games);

module.exports = {'model': Game, 'schema': Games};
