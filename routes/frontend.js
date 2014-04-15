var async = require('async');
var _ = require('lodash');
var extend = _.extend;
var clone = _.clone;
var forEach = _.forEach;
var partial = _.partial;
var api = require('../api');
var searchApi = require('../services/search/search');
var createQuery = require('./utils').createQuery;

//returns subheaders which depend on querystring
var createSubheaders = function (querystring) {
  var defaultHeaders = {
    topLeft: 'top pro match',
    topRight: 'top community match',
    botLeft: 'new pro matches',
    botRight: 'new community matches',
  }; 
  var queryHeaders = {
    botLeft: "pro results: ",
    botRight: "community results: "
  };

  return querystring ? queryHeaders : defaultHeaders;
};
                  
//mutative, add fields for templating
var presentMatch = function (match) {
  if (!match) return match;

  match.fighterOne = match.fighters[0];
  match.fighterTwo = match.fighters[1];
  return match;
};

module.exports = function (app) {
  app.get("/", function (req, res) {
    var querystring = req.query.search;
    var query = createQuery(req.query);
    var comQuery = {category: "community"};
    var proQuery = {category: "pro"};
    var communityMatchesQuery = extend(clone(query), comQuery);
    var proMatchesQuery = extend(clone(query), proQuery);

    async.parallel({
      proMatches: partial(api.getMatchesNested, proMatchesQuery),
      communityMatches: partial(api.getMatchesNested, communityMatchesQuery),
      featuredPro: api.getFeaturedProMatch,
      featuredCommunity: api.getFeaturedCommunityMatch
    }, function (err, results) {
      if (err) return res.redirect("error");
      
      //add fields for display
      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);
      presentMatch(results.featuredPro);
      presentMatch(results.featuredCommunity);
    
      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        featuredPro: querystring ? null : results.featuredPro,
        featuredCommunity: querystring ? null : results.featuredCommunity,
        subheaders: createSubheaders(querystring),
        searched: querystring,
      };

      res.render("index", payload); 
    }); 
  });
  
  app.get("/matches/search", function (req, res) {
    var search = req.query.search; 
    var comQuery = {category: "community"};
    var proQuery = {category: "pro"};

    async.parallel({
      proMatches: partial(searchApi.getMatchesForSearch, search, proQuery),
      communityMatches: partial(searchApi.getMatchesForSearch, search, comQuery),
      //TODO: Perhaps should also support focused match?  who knows...
    }, function (err, results) {
      //TODO: REMOVE THIS LOGGING AND USE REDIRECTS AS ABOVE
      console.log(err);

      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        subheaders: createSubheaders(search),
        searched: search
      }; 
      res.render("index", payload);
    });
  });
  
  app.get('/matches/:id', function (req, res) {
    var querystring = req.query.search;
    var id = req.params.id;
    var query = createQuery(req.query);
    var comQuery = {category: "community"};
    var proQuery = {category: "pro"};
    var communityMatchesQuery = extend(clone(query), comQuery);
    var proMatchesQuery = extend(clone(query), proQuery);

    async.parallel({
      proMatches: partial(api.getMatchesNested, proMatchesQuery),
      communityMatches: partial(api.getMatchesNested, communityMatchesQuery),
      featuredPro: api.getFeaturedProMatch,
      featuredCommunity: api.getFeaturedCommunityMatch,
      focusedMatch: partial(api.getMatchNested, id)
    }, function (err, results) {
      if (err) return res.redirect("error");
      if (!results.focusedMatch) return res.redirect("notfound");

      //add fields for display
      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);
      presentMatch(results.featuredPro);
      presentMatch(results.featuredCommunity);
      presentMatch(results.focusedMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        featuredPro: querystring ? null : results.featuredPro,
        featuredCommunity: querystring ? null : results.featuredCommunity,
        focusedMatch: results.focusedMatch,
        subheaders: createSubheaders(querystring),
        searched: querystring,
      };

      res.render("index", payload); 
    });
  });

  app.get("/error", function (req, res) {
    res.render("error"); 
  });

  app.get("/*", function (req, res) {
    res.render("notfound"); 
  });
};
