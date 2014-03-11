var mongoose = require('mongoose');

var SubmittedMatches = new mongoose.Schema({
  matchJson: Object
});

var SubmittedMatch = mongoose.model('SubmittedMatch', SubmittedMatches);

module.exports = {'model': SubmittedMatch, 'schema': SubmittedMatches};
