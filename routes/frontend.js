var async = require('async');
var moment = require('moment');
var _ = require('lodash');
var extend = _.extend;
var clone = _.clone;
var forEach = _.forEach;
var partial = _.partial;
var api = require('../api');
var searchApi = require('../services/search/search');
var utils = require('./utils');
var createQuery = utils.createQuery;
var trackViewedVideo = utils.trackViewedVideo;
var createSubheaders = utils.createSubheaders;

//mutative, add fields for templating
var presentMatch = function (match) {
  if (!match) return match;

  match.fighterOne = match.fighters[0];
  match.fighterTwo = match.fighters[1];
  return match;
};

module.exports = function (app) {
  var proQuery = {category: "pro"};
  var comQuery = {category: "community"};
  var getProMatches = partial(api.getMatchesNested, proQuery);
  var getCommunityMatches = partial(api.getMatchesNested, comQuery);
  var getProSearchMatches = partial(searchApi.getMatchesForSearch, proQuery);
  var getCommunitySearchMatches = partial(searchApi.getMatchesForSearch, comQuery);

  app.get("/", function (req, res) {
    async.parallel({
      proMatches: getProMatches,
      communityMatches: getCommunityMatches,
      featuredPro: api.getFeaturedProMatch,
      featuredCommunity: api.getFeaturedCommunityMatch
    }, function (err, results) {
      if (err) return res.redirect("error");
      
      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);
      presentMatch(results.featuredPro);
      presentMatch(results.featuredCommunity);
    
      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        featuredPro: results.featuredPro,
        featuredCommunity: results.featuredCommunity,
        subheaders: createSubheaders()
      };

      res.render("index", payload); 
    }); 
  });

  app.get("/matches/search", function (req, res) {
    var search = req.query.search; 

    async.parallel({
      proMatches: partial(getProSearchMatches, search),
      communityMatches: partial(getCommunitySearchMatches, search),
    }, function (err, results) {
      if (err) return res.redirect("error");

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

  app.get("/matches/today", function (req, res) {
    var minDate = moment().subtract("hours", 24).format();
    var proQuery = createQuery("ssf4-ae2012", "pro", minDate);
    var comQuery = createQuery("ssf4-ae2012", "community", minDate);

    async.parallel({
      proMatches: partial(api.getMatchesNested, proQuery),
      communityMatches: partial(api.getMatchesNested, comQuery),
    }, function (err, results) {
      if (err) return res.redirect("error");

      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        subheaders: createSubheaders(),
        searched: "today" 
      }; 
      res.render("index", payload);
    });
  });

  app.get("/matches/this-week", function (req, res) {
    var minDate = moment().subtract("weeks", 1).format();
    var proQuery = createQuery("ssf4-ae2012", "pro", minDate);
    var comQuery = createQuery("ssf4-ae2012", "community", minDate);

    async.parallel({
      proMatches: partial(api.getMatchesNested, proQuery),
      communityMatches: partial(api.getMatchesNested, comQuery),
    }, function (err, results) {
      if (err) return res.redirect("error");

      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        subheaders: createSubheaders(),
        searched: "this week"
      }; 
      res.render("index", payload);
    });
  });

  app.get("/matches/this-month", function (req, res) {
    var minDate = moment().subtract("months", 1).format();
    var proQuery = createQuery("ssf4-ae2012", "pro", minDate);
    var comQuery = createQuery("ssf4-ae2012", "community", minDate);

    async.parallel({
      proMatches: partial(api.getMatchesNested, proQuery),
      communityMatches: partial(api.getMatchesNested, comQuery),
    }, function (err, results) {
      if (err) return res.redirect("error");

      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        subheaders: createSubheaders(),
        searched: "this month"
      }; 
      res.render("index", payload);
    });
  });

  app.get("/matches/this-year", function (req, res) {
    var minDate = moment().subtract("years", 1).format();
    var proQuery = createQuery("ssf4-ae2012", "pro", minDate);
    var comQuery = createQuery("ssf4-ae2012", "community", minDate);

    async.parallel({
      proMatches: partial(api.getMatchesNested, proQuery),
      communityMatches: partial(api.getMatchesNested, comQuery),
    }, function (err, results) {
      if (err) return res.redirect("error");

      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        subheaders: createSubheaders(),
        searched: "this year"
      }; 
      res.render("index", payload);
    });
  });
  
  app.get('/matches/:id', function (req, res) {
    var id = req.params.id;
    var googleClientId = req.cookies._ga;
    
    async.parallel({
      proMatches: getProMatches,
      communityMatches: getCommunityMatches,
      featuredPro: api.getFeaturedProMatch,
      featuredCommunity: api.getFeaturedCommunityMatch,
      focusedMatch: partial(api.getMatchNested, id)
    }, function (err, results) {
      if (err) return res.redirect("error");
      if (!results.focusedMatch) return res.redirect("notfound");

      forEach(results.proMatches, presentMatch);
      forEach(results.communityMatches, presentMatch);
      presentMatch(results.featuredPro);
      presentMatch(results.featuredCommunity);
      presentMatch(results.focusedMatch);

      var payload = {
        proMatches: results.proMatches,
        communityMatches: results.communityMatches,
        featuredPro: results.featuredPro,
        featuredCommunity: results.featuredCommunity,
        focusedMatch: results.focusedMatch,
        subheaders: createSubheaders(),
      };

      trackViewedVideo(results.focusedMatch, googleClientId);
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
