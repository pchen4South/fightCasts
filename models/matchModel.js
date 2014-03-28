var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var fighterSchema = require('./fighterModel').schema;
var eventSchema = require('./eventModel').schema;
// var gameSchema = require('./gameModel').schema;
// var channelSchema = require('./channelModel').schema;
var teamSchema = require('./teamModel').schema;
var videoSchema = require('./videoModel').schema;

var Matches = new mongoose.Schema({
  approved: {type: Boolean, default: true},
  featured: {type: Boolean, default: false},
  title: String,
  description: String,
  playedAt: Date,
  game: String,
  characters: String,
  _casters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
  _fighterOne: { type: mongoose.Schema.Types.ObjectId, ref: "Fighter" },
  _fighterTwo: { type: mongoose.Schema.Types.ObjectId, ref: "Fighter" },
  _videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}],
  _teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
  _event: {type: mongoose.Schema.Types.ObjectId, ref: "Event"},
  
  //pro / scrub / community
  category: String
});

Matches.plugin(timestamps);
var Match = mongoose.model('Match', Matches);

module.exports = {'model': Match, 'schema': Matches}
