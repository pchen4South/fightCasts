var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var eventSchema = require('./eventModel').schema;

var Matches = new mongoose.Schema({
  title: String,
  description: String,
  playedAt: Date,
  game: String,
  _casters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
  _event: {type: mongoose.Schema.Types.ObjectId, ref: "Event"},
  
  //pro / scrub / community
  category: String
});

Matches.plugin(timestamps);
var Match = mongoose.model('Match', Matches);

module.exports = {'model': Match, 'schema': Matches}
