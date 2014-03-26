var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var matchSchema = require('./matchModel').schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var FeaturedMatches = new mongoose.Schema({
  _match: {type: ObjectId, ref: "Match"},
  _game: {type: ObjectId, ref: "Game"},
  category: String
});

FeaturedMatches.plugin(timestamps);

var FeaturedMatch = mongoose.model("FeaturedMatch", FeaturedMatches);

module.exports = {
  model: FeaturedMatch,
  schema: FeaturedMatches
};
