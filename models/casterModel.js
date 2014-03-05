var mongoose = require('mongoose');

var Casters = new mongoose.Schema({
  name: String
});

var Caster = mongoose.model('Caster', Casters);

module.exports = Caster;