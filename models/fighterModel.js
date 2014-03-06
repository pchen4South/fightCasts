var mongoose = require('mongoose');
var playerSchema = require('./playerModel')['schema'];
var characterSchema = require('./characterModel')['schema'];

var Fighters = new mongoose.Schema({
  _player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  _characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }]
});

var Fighter = mongoose.model('Fighter', Fighters);

module.exports = {'model': Fighter}
