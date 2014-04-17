var api = require('../api');
var createQuery = require('./utils').createQuery;
var gamesList = require('../models/gameCharacterData');
var passport = require('passport');
var ensureAuthenticated = require('./utils').ensureAuthenticated;
var trackCreatedContact = require('./utils').trackCreatedContact;

module.exports = function (app) {

  //CREATE
  /*
    We don't want to delay the response to wait for email
    to send so we respond once the contact is created and then
    carry on w/ sending the email
  */
  app.post("/api/v1/contacts", function (req, res) {
    if (!req.body.email) return res.send(400, "No valid email");
    var mailer = app.get("mailer");
    var signup = app.get("emails").contactSignup;
    var options = {
      to: req.body.email,
      subject: "Thanks for signing up!",
      html: signup({email: req.body.email})
    };

    api.createContact(req.body, function (err, contact) {
      if (err) return res.send(400, {err: err.message}); 
      else res.json({contact: contact});
      mailer.sendMail(options, function (err, result) {
        //handle email error?
        trackCreatedContact(contact, req.cookies._ga);
        return;
      }); 
    }); 
  });

  app.post("/api/v1/people", ensureAuthenticated,
    function (req, res) {
      api.createPerson(req.body, function (err, person) {
        if (err) res.send(400, {err: err.message}); 
        else res.json({person: person});
      });
  });


  app.post("/api/v1/events", ensureAuthenticated, function (req, res) {
    api.createEvent(req.body, function (err, event) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({event: event});
    });
  });

  app.post("/api/v1/matches", ensureAuthenticated, function (req, res) {
    api.createMatch(req.body, function (err, match) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({match: match});
    });
  });

  //UPDATE
  app.post("/api/v1/matches/:id/feature", ensureAuthenticated, function (req, res) {
    var matchId = req.params.id;
    api.featureMatch(matchId, function (err, featuredMatch) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({featuredMatch: featuredMatch});
    });
  });
  
  //delete
  app.post("/api/v1/matches/:id/delete", ensureAuthenticated,
    function (req, res) {
      var matchId = req.params.id;
      api.deleteMatch(matchId, function (err, deletedMatch) {
        if (err) res.send(400, {err: err.message}); 
        else res.json({deletedMatch: deletedMatch});
      });
  });

  app.post("/api/v1/events/:id/delete", ensureAuthenticated,
    function (req, res) {
      var matchId = req.params.id;
      api.deleteEvent(matchId, function (err, deletedEvent) {
        if (err) res.send(400, {err: err.message}); 
        else res.json({deletedEvent: deletedEvent});
      });
  });
  
  app.post("/api/v1/people/:id/delete", ensureAuthenticated,
    function (req, res) {
      var matchId = req.params.id;
      api.deletePerson(matchId, function (err, deletedPerson) {
        if (err) res.send(400, {err: err.message}); 
        else res.json({deletedPerson: deletedPerson});
      });
  });  
  
  app.post("/api/v1/contacts/:id/delete", ensureAuthenticated,
    function (req, res) {
      var matchId = req.params.id;
      api.deleteContact(matchId, function (err, deletedContact) {
        if (err) res.send(400, {err: err.message}); 
        else res.json({deletedContact: deletedContact});
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
  
  app.get("/api/v1/contacts", function (req, res) {
    api.getContacts(function (err, contacts) {
      if (err) res.send(400, {err: err.message}); 
      else res.json({
        contacts: contacts
      });
    });
  });
  
    
  app.get("/api/v1/games", function (req, res) {
    res.json({games: gamesList});
  });
  
  app.get("/api/v1/matches", function (req, res) {
    var querystring = req.query.search || {};
    var query = {};
    
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
