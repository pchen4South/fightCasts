var mongoose = require("mongoose");
var through = require("through");
var _ = require("lodash");
var isFunction = _.isFunction;
var searchApi = require("../services/search/search");
var mongoUri = require('../config.json').services.db.uri;
var api = require("../api");

//TODO: error handling?
var indexMatches = function (options, cb) {
  if (isFunction(options)) cb = options;

  api.getMatchesNestedStream()
  .pipe(through(function (match) {
    var _this = this; 

    searchApi.indexMatch(match, function (err, res) {
      if (options.logger) {
        options.logger.log("Match id:" + match._id + " indexed");
      }
      _this.queue(match); 
    });
  }, function () {
    if (options.logger) {
      options.logger.log("Match indexeding complete") 
    } 
    if (cb) cb();
  }));
};

//connect to mongoose and run if called directly
if (!module.parent) {
  mongoose.connect(mongoUri);
  indexMatches(mongoose.disconnect.bind(mongoose));
} else {
  module.exports.indexMatches = indexMatches;
}
