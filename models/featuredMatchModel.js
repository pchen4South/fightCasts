var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var matchSchema = require('./matchModel').schema;

var FeaturedMatches = new mongoose.Schema({
  _match: {type: mongoose.Schema.Types.ObjectId, ref: "Match"},
  //TODO: implement some kind of game field whether foreign key or string
  game: String,
  category: String
});

FeaturedMatches.plugin(timestamps);

var FeaturedMatch = mongoose.model("FeaturedMatch", FeaturedMatches);

module.exports = {
  model: FeaturedMatch,
  schema: FeaturedMatches
};
