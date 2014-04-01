var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Fighters = new mongoose.Schema({
  person: {type: ObjectId, ref: "Person"},
  characters: Array
});

var Matches = new mongoose.Schema({
  game: String,
  title: String,
  description: String,
  category: String,
  playedAt: Date,
  featuredAt: {type: Date, default: null},
  videos: Array,
  fighters: [Fighters],
  casters: [{ type: ObjectId, ref: "Person" }],
  event: {type: ObjectId, ref: "Event"},
});

Matches.plugin(timestamps);

var Match = mongoose.model('Match', Matches);
var Fighter = mongoose.model("Fighter", Fighters);

module.exports.model = Match;
module.exports.schema = Matches;
