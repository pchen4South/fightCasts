var api = require('../api');
var createQuery = require('./utils').createQuery;
var gamesList = require('../models/gameCharacterData');

module.exports = function (app) {

  //CREATE
  app.post("/api/v1/people", function (req, res) {
    api.createPerson(req.body, function (err, person) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({person: person});
    });
  });


  app.post("/api/v1/events", function (req, res) {
    api.createEvent(req.body, function (err, event) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({event: event});
    });
  });

  app.post("/api/v1/matches", function (req, res) {
    api.createMatch(req.body, function (err, match) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({match: match});
    });
  });

  //UPDATE
  app.post("/api/v1/matches/:id/feature", function (req, res) {
    var matchId = req.params.id;

    api.featureMatch(matchId, function (err, featuredMatch) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({featuredMatch: featuredMatch});
    });
  });

  //READ
  app.get("/api/v1/people", function (req, res) {
    api.getPeople(function (err, people) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({
        people: people 
      });
    });
  });

  app.get("/api/v1/events", function (req, res) {
    api.getEvents(function (err, events) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({
        events: events 
      });
    });
  });
  
    
  app.get("/api/v1/games", function (req, res) {
    console.log(gamesList);
    res.json({games: gamesList["1"]});
  });
  
  app.get("/api/v1/matches", function (req, res) {
    var query = createQuery(req.query);
    var querystring = req.query.search;
 
    api.getMatchesNested(query, function (err, matches) {
      if (err) res.send(400, {err: err.message});
      else res.json({
        matches: matches,
        query: querystring
      }); 
    }); 
  });

  app.get("/api/v1/matches/featured/pro", function (req, res) {
    api.getFeaturedProMatch(function (err, featuredMatch) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({featuredMatch: featuredMatch});
    });
  });

  app.get("/api/v1/matches/featured/community", function (req, res) {
    api.getFeaturedCommunityMatch(function (err, featuredMatch) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({featuredMatch: featuredMatch});
    });
  });
};
