var mongoose = require('mongoose');
var playerSchema = require('./playerModel')['schema'];
var characterSchema = require('./characterModel')['schema'];

var Fighters = new mongoose.Schema({
  _player: { type: mongoose.Schema.Types.ObjectId, ref: playerSchema },
  _character: { type: mongoose.Schema.Types.ObjectId, ref: characterSchema }
});

var Fighter = mongoose.model('Fighter', Fighters);

module.exports = {'model': Fighter}