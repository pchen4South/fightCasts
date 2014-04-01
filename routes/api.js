var api = require('../api');
var createQuery = require('./utils').createQuery;

module.exports = function (app) {

  app.post("/api/v1/people", function (req, res) {
    var person = {
      name: req.body.name,
      country: req.body.country
    };
    api.createPerson(person, function (err, person) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({person: person});
    });
  });

  app.post("/api/v1/events", function (req, res) {
    var event = {
      name: req.body.name 
    };
    api.createEvent(event, function (err, event) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({person: event});
    });
  });

  //TODO: implement once match model solidifies
  app.post("/api/v1/matches", function (req, res) {
    res.json({message: "This route is not currently supported"});
  });

  //add match to featuredMatches list
  app.post("/api/v1/matches/:id/feature", function (req, res) {
    var matchId = req.params.id;

    api.featureMatch(matchId, function (err, featuredMatch) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({featuredMatch: featuredMatch});
    });
  });

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

  app.get("/api/v1/featuredMatches", function (req, res) {
    api.getFeaturedMatchesNested(function (err, featuredMatches) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({featuredMatches: featuredMatches});
    });
  });
};
