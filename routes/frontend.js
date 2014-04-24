var async = require('async');
var moment = require('moment');
var _ = require('lodash');
var forEach = _.forEach;
var partial = _.partial;
var api = require('../api');
var searchApi = require('../services/search/search');
var utils = require('./utils');
var trackViewedVideo = require('../services/analytics/analytics').trackViewedVideo;
var createSubheaders = utils.createSubheaders;

//mutative, add fields for templating
var presentMatch = function (gameSlug, match) {
  if (!match) return match;

  match.url = "/" + gameSlug + "/matches/" + match._id;
  match.fighterOne = match.fighters[0];
  match.fighterTwo = match.fighters[1];
  
  return match;
};

//lazy...plural form...so tired
var presentMatches = function (gameSlug, matches) {
  if (!matches) return matches;

  forEach(matches, function (match) {
    match.url = "/" + gameSlug + "/matches/" + match._id;
    match.fighterOne = match.fighters[0];
    match.fighterTwo = match.fighters[1];
  });
  
  return matches;
};

//default value is last 10 years....because ya....h4x
var calculateMinDate = function (range) {
  var minDate;

  switch (range) {
    case "today":
      minDate = moment().subtract("days" , 1).format();
      break;
    case "this-week":
      minDate = moment().subtract("weeks" , 1).format();
      break;
    case "this-month":
      minDate = moment().subtract("months" , 1).format();
      break;
    case "this-year":
      minDate = moment().subtract("years" , 1).format();
      break;
    default:
      minDate = moment().subtract("years", 10).format();
  }

  return minDate;
};

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.redirect("/ssf4-ae2012/matches");
  });

  app.get("/:gameSlug/matches", function (req, res) {
    var gameSlug = req.params.gameSlug;

    api.getGameIdBySlug(gameSlug, function (err, id) {
      if (err) return res.redirect("error");
      if (!id) return res.redirect("notFound");

      var proQuery = {
        category: "pro",
        game: id
      };
      var comQuery = {
        category: "community",
        game: id
      };
      var getProMatches = partial(api.getMatchesNested, proQuery);
      var getCommunityMatches = partial(api.getMatchesNested, comQuery);

      async.parallel({
        proMatches: getProMatches,
        communityMatches: getCommunityMatches,
        featuredPro: api.getFeaturedProMatch,
        featuredCommunity: api.getFeaturedCommunityMatch
      }, function (err, results) {
        if (err) return res.redirect("error");
        
        presentMatches(gameSlug, results.proMatches);
        presentMatches(gameSlug, results.communityMatches);
        presentMatch(gameSlug, results.featuredPro);
        presentMatch(gameSlug, results.featuredCommunity);
      
        var payload = {
          proMatches: results.proMatches,
          communityMatches: results.communityMatches,
          featuredPro: results.featuredPro,
          featuredCommunity: results.featuredCommunity,
          subheaders: createSubheaders(),
          gameSlug: gameSlug,
          user: req.session.user
        };

        res.render("index", payload); 
      }); 
    });
  });

  app.get("/:gameSlug/matches/search", function (req, res) {
    var gameSlug = req.params.gameSlug;

    api.getGameIdBySlug(gameSlug, function (err, id) {
      if (err) return res.redirect("error");
      if (!id) return res.redirect("notFound");

      var search = req.query.search;
      var range = req.query.range;
      var now = Date.now();
      var minDate = calculateMinDate(range);
      var proQuery = {
        category: "pro",
        game: id,
        playedAt: {
          "$gte": minDate,
          "$lt": now 
        }
      };
      var comQuery = {
        category: "community",
        game: id,
        playedAt: {
          "$gte": minDate,
          "$lt": now 
        }
      };
      var getProMatches = search
        ? partial(searchApi.getMatchesForSearch, search, proQuery)
        : partial(api.getMatchesNested, proQuery);
      var getCommunityMatches = search
        ? partial(searchApi.getMatchesForSearch, search, comQuery)
        : partial(api.getMatchesNested, comQuery);

      async.parallel({
        proMatches: getProMatches,
        communityMatches: getCommunityMatches,
      }, function (err, results) {
        if (err) return res.redirect("error");
        
        presentMatches(gameSlug, results.proMatches);
        presentMatches(gameSlug, results.communityMatches);
      
        var payload = {
          proMatches: results.proMatches,
          communityMatches: results.communityMatches,
          subheaders: createSubheaders(),
          searched: (search || "") + " " + (range || ""),
          gameSlug: gameSlug,
          user: req.session.user
        };

        res.render("index", payload); 
      }); 
    });
  });

  app.get('/:gameSlug/matches/:id', function (req, res) {
    var gameSlug = req.params.gameSlug;
    var session_user = req.session.user;
    
    api.getGameIdBySlug(gameSlug, function (err, id) {
      if (err) return res.redirect("error");
      if (!id) return res.redirect("notFound");

      var matchId = req.params.id;
      //var googleClientId = req.cookies._ga;
      var proQuery = {
        category: "pro",
        game: id
      };
      var comQuery = {
        category: "community",
        game: id
      };
      var getProMatches = partial(api.getMatchesNested, proQuery);
      var getCommunityMatches = partial(api.getMatchesNested, comQuery);
      
      async.parallel({
        proMatches: getProMatches,
        communityMatches: getCommunityMatches,
        featuredPro: api.getFeaturedProMatch,
        featuredCommunity: api.getFeaturedCommunityMatch,
        focusedMatch: partial(api.getMatchNested, matchId)
      }, function (err, results) {
        if (err) return res.redirect("error");
        if (!results.focusedMatch) return res.redirect("notfound");

        presentMatches(gameSlug, results.proMatches);
        presentMatches(gameSlug, results.communityMatches);
        presentMatch(gameSlug, results.featuredPro);
        presentMatch(gameSlug, results.featuredCommunity);
        presentMatch(gameSlug, results.focusedMatch);
      
        var payload = {
          proMatches: results.proMatches,
          communityMatches: results.communityMatches,
          featuredPro: results.featuredPro,
          featuredCommunity: results.featuredCommunity,
          focusedMatch: results.focusedMatch,
          subheaders: createSubheaders(),
          gameSlug: gameSlug,
          user: req.session.user
        };

        trackViewedVideo(results.focusedMatch, session_user);
        res.render("index", payload); 
      });
    });
  });

  app.get("/error", function (req, res) {
    res.render("error"); 
  });

  app.get("/*", function (req, res) {
    res.render("notfound"); 
  });
};
