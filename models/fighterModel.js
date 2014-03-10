var mongoose = require('mongoose');

var Fighters = new mongoose.Schema({
  playerName: String,
  _characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
  _person: {type: mongoose.Schema.Types.ObjectId, ref: "Person"}
});

var Fighter = mongoose.model('Fighter', Fighters);

module.exports = {'model': Fighter}
