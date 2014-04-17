var mongoose = require("mongoose");
var through = require("through");
var searchApi = require("../services/search/search");
var mongoUri = require('../config.json').services.db.uri;
var api = require("../api");

//TODO: error handling?
var indexMatches = function (cb) {
  api.getMatchesNestedStream()
  .pipe(through(function (match) {
    var _this = this; 

    searchApi.indexMatch(match, function (err, res) {
      _this.queue(match); 
    });
  }, cb));
};

//connect to mongoose and run if called directly
if (!module.parent) {
  mongoose.connect(mongoUri);
  indexMatches(mongoose.disconnect.bind(mongoose));
} else {
  module.exports.indexMatches = indexMatches;
}
