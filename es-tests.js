var mongoose = require("mongoose");
var through = require("through");
var searchApi = require("./services/search/search");
var mongoUri = require('./config.json').services.db.uri;
var api = require("./api");

//used in through stream
//TODO: error handling?
var indexMatch = function (match) {
  var _this = this;

  searchApi.indexMatch(match, function (err, res) {
    if (err) console.error(err);
    _this.queue(match);    
  }); 
};

var indexMatches = function (cb) {
  api.getMatchesNestedStream()
  .pipe(through(indexMatch, cb));
};

if (!module.parent) {
  mongoose.connect(mongoUri);
  indexMatches(mongoose.disconnect.bind(mongoose));
} else {
  module.exports.indexMatches = indexMatches;
}

