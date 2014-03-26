var _ = require('lodash');
var async = require('async');
var find = _.find;
var first = _.first;
var filter = _.filter;
var extend = _.extend;
var clone = _.clone;
var sortBy = _.sortBy;
var partial = _.partial;
var isEmpty = _.isEmpty;
var api = require('../api');
var gameFilter = {default: 'SF4'};

module.exports = function (app) {
  var getMatches = function (rawQuery, cb) {
    var query = !isEmpty(rawQuery) ? parseQuery(rawQuery) : {};
    var comQuery = {category: "community"};
    var proQuery = {category: "pro"};
    var communityMatchesQuery = extend(clone(query), comQuery);
    var proMatchesQuery = extend(clone(query), proQuery);
  
    async.parallel({
      proMatches: partial(api.getMatchesNested, proMatchesQuery),
      communityMatches: partial(api.getMatchesNested, communityMatchesQuery),
      featuredPro: partial(api.getFeaturedMatch, proQuery),
      featuredCommunity: partial(api.getFeaturedMatch, comQuery)
    }, cb);
  };
    
  var parseQuery = function(query){
    var searchString = query.search;
    var gameString = query.game;
    
    if(!gameString){gameString = "SF4"}
    return {title: {"$regex": new RegExp(searchString, "i")}};
  };

  app.get("/", function (req, res) {
    getMatches(req.query, function (err, results) {
      var payload = {
        proMatches: sortBy(results.proMatches, "createdAt"),
        communityMatches: sortBy(results.communityMatches, "createdAt"),
        featuredPro: results.featuredPro,
        featuredCommunity: results.featuredCommunity
      };

      res.send("index", payload); 
    }); 
  });
  app.get('/matches/:id', function (req, res) {
    var id = req.params.id;
    
    async.parallel({
      matchData: partial(getMatches, req.query),
      focusedMatch: partial(api.getMatchNested, id)
    }, function (err, results) {
      var payload = {
        proMatches: sortBy(results.matchData.proMatches, "createdAt"),
        communityMatches: sortBy(results.matchData.communityMatches, "createdAt"),
        featuredPro: results.matchData.featuredPro,
        featuredCommunity: results.matchData.featuredCommunity,
        focusedMatch: results.focusedMatch
      };

      res.render("index", payload); 
    });
  });
};
