var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Teams = new mongoose.Schema({
  name: String
});

Teams.plugin(timestamps);

var Team = mongoose.model('Team', Teams);

module.exports = {'model': Team, 'schema': Teams};