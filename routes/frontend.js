var _ = require('lodash');
var async = require('async');
var find = _.find;
var first = _.first;
var filter = _.filter;
var extend = _.extend;
var clone = _.clone;
var cloneDeep = _.cloneDeep;
var sortBy = _.sortBy;
var map = _.map;
var forEach = _.forEach;
var partial = _.partial;
var isEmpty = _.isEmpty;
var api = require('../api');
var createQuery = require('./utils').createQuery;
var gameFilter = {default: 'SF4'};
var subheaders = {
  default: {
    topLeft: 'top pro match',
    topRight: 'top community match',
    botLeft: 'new pro matches',
    botRight: 'new community matches'},
    searchPage: {botLeft: 'results: pro',
    botRight: 'results: community'
  }
};
                  
//mutative, add fields for templating
var presentMatch = function (match) {
  match.fighterOne = match.fighters[0];
  match.fighterTwo = match.fighters[1];
  return match;
};

module.exports = function (app) {
  var getMatches = function (rawQuery, cb) {
    var query = createQuery(rawQuery);
    var comQuery = {category: "community"};
    var proQuery = {category: "pro"};
    var communityMatchesQuery = extend(clone(query), comQuery);
    var proMatchesQuery = extend(clone(query), proQuery);
  
    async.parallel({
      proMatches: partial(api.getMatchesNested, proMatchesQuery),
      communityMatches: partial(api.getMatchesNested, communityMatchesQuery),
      //featuredPro: partial(api.getFeaturedMatch, proQuery),
      //featuredCommunity: partial(api.getFeaturedMatch, comQuery)
    }, cb);
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
      if (results.proMatches) focused = results.proMatches[0];
      else if (results.communityMatches) focused = results.communityMatches[0];
      //else focused = results.featuredPro;

      //add fields for display
      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);
    
      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        //featuredPro: queryFlag ? null : results.featuredPro,
        //featuredCommunity: queryFlag ? null : results.featuredCommunity,
        subheaders: subheaderText,
        searched: searched,
        defaultFocused: focused
      };
  
      //console.log(JSON.stringify(payload, null, 4));
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
        //featuredPro: queryFlag ? null : results.matchData.featuredPro,
        //featuredCommunity: queryFlag ? null : results.matchData.featuredCommunity,
        focusedMatch: results.focusedMatch,
        searched: searched,
        subheaders: subheaderText
      };

      res.render("index", payload); 
    });
  });
};
