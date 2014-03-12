var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var SubmittedMatches = new mongoose.Schema({
  matchJson: Object
});

SubmittedMatches.plugin(timestamps);

var SubmittedMatch = mongoose.model('SubmittedMatch', SubmittedMatches);

module.exports = {'model': SubmittedMatch, 'schema': SubmittedMatches};
