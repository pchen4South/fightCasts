var _ = require("lodash");
var extend = _.extend;
var isFunction = _.isFunction;
var cloneDeep = _.cloneDeep;
var searchApi = require("./services/search/search");
var api = require("./api");
var mongoose = require("mongoose");
var mongoUri = require('./config.json').services.db.uri;

/*
 * here we just create some additional query to be 
 * combined with the fuzzy string search that returns
 * all ids etc blah blah.  could be rolled into ES 
 * eventually if desired
**/
var search = "Smug";
var query = {
  category: "community"
};

mongoose.connect(mongoUri);

searchApi.getMatchesForSearch(search, query, function (err, matches) {
  console.log(err);
  console.log(matches);
  mongoose.disconnect();
});
