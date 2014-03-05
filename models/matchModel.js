var mongoose = require('mongoose');
var fighterSchema = require('./fighterModel').schema;
var eventSchema = require('./eventModel').schema;
var gameSchema = require('./gameModel').schema;
var channelSchema = require('./channelModel').schema;
var teamSchema = require('./teamModel').schema;
var casterSchema = require('./casterModel').schema;
var videoSchema = require('./videoModel').schema;

var Matches = new mongoose.Schema({
  _fighters: [{ type: mongoose.Schema.Types.ObjectId, ref: fighterSchema }],
  _casters: [{ type: mongoose.Schema.Types.ObjectId, ref: casterSchema }],
  _videos: [{type: mongoose.Schema.Types.ObjectId, ref: videoSchema}],
  _teams: [{type: mongoose.Schema.Types.ObjectId, ref: teamSchema}],
  _event: {type: mongoose.Schema.Types.ObjectId, ref: eventSchema},
  _game: {type: mongoose.Schema.Types.ObjectId, ref: gameSchema},
  _channel: {type: mongoose.Schema.Types.ObjectId, ref: channelSchema},  
});

var Match = mongoose.model('Match', Matches);

module.exports = {'model': Match, 'schema': Matches}