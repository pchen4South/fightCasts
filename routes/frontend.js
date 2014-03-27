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
var subheaders = {default: {topLeft: 'top pro match',
                            topRight: 'top community match',
                            botLeft: 'new pro matches',
                            botRight: 'new community matches'},
                  searchPage: {botLeft: 'results: pro',
                               botRight: 'results: community'}}
                  
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
    var searched = req.query.search;
    //queryFlag is true when there is a search query
    var queryFlag = !isEmpty(req.query);
    if(queryFlag){
      var searched = req.query.search;
      var subheaderText = subheaders.searchPage;
    }else var subheaderText = subheaders.default;

    
    getMatches(req.query, function (err, results) {
      var focused = {};     
      if(results.proMatches){focused = results.proMatches[0]}
      else if(results.communityMatches){focused = results.communityMatches[0]}
      else focused = results.featuredPro;
    
      var payload = {
        proMatches: sortBy(results.proMatches, "createdAt"),
        communityMatches: sortBy(results.communityMatches, "createdAt"),
        featuredPro: queryFlag ? null : results.featuredPro,
        featuredCommunity: queryFlag ? null : results.featuredCommunity,
        subheaders: subheaderText,
        searched: searched,
        defaultFocused: focused
      };
  
      res.render("index", payload); 
    }); 
  });
  app.get('/matches/:id', function (req, res) {
    var id = req.params.id;
    //queryFlag is true when there is a search query
    var queryFlag = !isEmpty(req.query);
    if(queryFlag){
      var searched = req.query.search;
      var subheaderText = subheaders.searchPage;
    }else var subheaderText = subheaders.default;
    
    async.parallel({
      matchData: partial(getMatches, req.query),
      focusedMatch: partial(api.getMatchNested, id)
    }, function (err, results) {
      var payload = {
        proMatches: sortBy(results.matchData.proMatches, "createdAt"),
        communityMatches: sortBy(results.matchData.communityMatches, "createdAt"),
        featuredPro: queryFlag ? null : results.matchData.featuredPro,
        featuredCommunity: queryFlag ? null : results.matchData.featuredCommunity,
        focusedMatch: results.focusedMatch,
        searched: searched,
        subheaders: subheaderText
      };

      res.render("index", payload); 
    });
  });
};
