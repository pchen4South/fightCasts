var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = mongoose.Schema.Types.ObjectId;

var FeaturedMatches = new mongoose.Schema({
  match: {type: ObjectId, ref: "Match"},
});

FeaturedMatches.plugin(timestamps);

var FeaturedMatch = mongoose.model("FeaturedMatch", FeaturedMatches);

module.exports.model = FeaturedMatch;
module.exports.schema = FeaturedMatches;
