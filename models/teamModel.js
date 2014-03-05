var mongoose = require('mongoose');

var Teams = new mongoose.Schema({
  name: String
});

var Team = mongoose.model('Team', Teams);

module.exports = {'model': Team, 'schema': Teams};