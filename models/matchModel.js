var mongoose = require('mongoose');
var fighterSchema = require('./fighterModel').schema;
var eventSchema = require('./eventModel').schema;
var gameSchema = require('./gameModel').schema;
var channelSchema = require('./channelModel').schema;
var teamSchema = require('./teamModel').schema;
var videoSchema = require('./videoModel').schema;

var Matches = new mongoose.Schema({
  approved: {type: Boolean, default: false},
  title: String,
  _casters: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
  _fighters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fighter" }],
  _videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}],
  _teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
  _event: {type: mongoose.Schema.Types.ObjectId, ref: "Event"},
  _game: {type: mongoose.Schema.Types.ObjectId, ref: "Game"},
  _channel: {type: mongoose.Schema.Types.ObjectId, ref: "Channel"},  
});

var Match = mongoose.model('Match', Matches);

module.exports = {'model': Match, 'schema': Matches}
