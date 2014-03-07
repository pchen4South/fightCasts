var mongoose = require('mongoose');

var Fighters = new mongoose.Schema({
  _person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
  _characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }]
});

var Fighter = mongoose.model('Fighter', Fighters);

module.exports = {'model': Fighter}
