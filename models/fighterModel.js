var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Fighters = new mongoose.Schema({
  _characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
  _person: {type: mongoose.Schema.Types.ObjectId, ref: "Person"}
});
Fighters.plugin(timestamps);
var Fighter = mongoose.model('Fighter', Fighters);

module.exports = {'model': Fighter}
