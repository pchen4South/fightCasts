var api = require('../api');
var createQuery = require('./utils').createQuery;
var gamesList = require('../models/gameCharacterData');
var passport = require('passport');
var ensureAuthenticated = require('./utils').ensureAuthenticated;
var trackCreatedContact = require('../services/analytics/analytics').trackCreatedContact;

module.exports = function (app) {

  //CREATE
  var signup = function (req, res) {
    var mailer = app.get("mailer");
    var signup = app.get("emails").contactSignup;
    var options = {
      to: req.body.email,
      subject: "Thanks for signing up!",
      html: signup({email: req.body.email})
    };

    api.createUser(req.body, function (err, user) {
      if (err) {
        return res.send(400, err.message); 
      } else {
        req.session.user = user;
        //FIXME: this was throwing errors for some reason
        //trackCreatedContact(user, req.cookies._ga);
        mailer.sendMail(options);
        res.json({user: user});
      }
    }); 
  };

  var login = function (req, res) {
    api.verifyUser(req.body, function (err, user) {
      if (err) {
        return res.send(400, err.message); 
      } else {
        req.session.user = user;
        res.json({
          user: user 
        });
      }
    });
  };

  var logout = function (req, res) {
    req.session.user = null; 
    res.json(200, "Logged out");
  };

  var changePassword = function (req, res) {
    var userData = {
      email: req.body.email,
      password: req.body.password 
    }; 
    var newPassword = req.body.newPassword;

    api.changeUserPassword(userData, newPassword, function (err, user) {
      if (err) return res.send(400, err.message); 
      else res.json({
        user: user 
      });
    });
  };

  var resetPassword = function (req, res) {
    var email = req.body.email;
    var mailer = app.get("mailer");
    var forgotPw = app.get("emails").forgotPw;

    api.resetUserPassword(email, function (err, tempPw) {
      var options = {
        to: email,
        subject: "Here is a temporary password!",
        html: forgotPw({
          email: email,
          tempPw: tempPw
        })
      };

      if (err) {
        return res.send(400, err.message); 
      } else {
        mailer.sendMail(options);
        res.json({
          tempPw: tempPw 
        });
      }
    });
  };

  app.post("/api/v1/users", signup);
  app.post("/api/v1/signup", signup);
  app.post("/api/v1/login", login);
  app.post("/api/v1/logout", logout);
  app.post("/api/v1/changePassword", changePassword);
  app.post("/api/v1/resetPassword", resetPassword);

  app.post("/api/v1/people", ensureAuthenticated, function (req, res) {
    api.createPerson(req.body, function (err, person) {
      if (err) res.send(400, err.message); 
      else res.json({person: person});
    });
  });


  app.post("/api/v1/events", ensureAuthenticated, function (req, res) {
    api.createEvent(req.body, function (err, event) {
      if (err) res.send(400, err.message); 
      else res.json({event: event});
    });
  });

  app.post("/api/v1/matches", ensureAuthenticated, function (req, res) {
    api.createMatch(req.body, function (err, match) {
      if (err) res.send(400, err.message); 
      else res.json({match: match});
    });
  }); 
  
  //UPDATE
  app.post("/api/v1/matches/:id", ensureAuthenticated, function (req, res) {
    api.updateMatchById(req.params.id, req.body, function (err, match) {
      if (err) res.send(400, err.message); 
      else res.json({match: match});
    });
  });

  app.post("/api/v1/matches/:id/feature", ensureAuthenticated, function (req, res) {
    var matchId = req.params.id;
    api.featureMatch(matchId, function (err, featuredMatch) {
      if (err) res.send(400, err.message); 
      else res.json({featuredMatch: featuredMatch});
    });
  });
  
  app.post("/api/v1/users/:id", ensureAuthenticated, function (req, res) {
    api.updateUserById(req.params.id, req.body, function (err, match) {
      if (err) res.send(400, err.message); 
      else res.json({match: match});
    });
  });  
  
  app.post("/api/v1/people/:id", ensureAuthenticated, function (req, res) {
    api.updatePersonById(req.params.id, req.body, function (err, match) {
      if (err) res.send(400, err.message); 
      else res.json({match: match});
    });
  });  
  
  app.post("/api/v1/events/:id", ensureAuthenticated, function (req, res) {
    api.updateEventById(req.params.id, req.body, function (err, match) {
      if (err) res.send(400, err.message); 
      else res.json({match: match});
    });
  });
  
  //delete
  app.post("/api/v1/matches/:id/delete", ensureAuthenticated, function (req, res) {
    var matchId = req.params.id;
    api.deleteMatch(matchId, function (err, deletedMatch) {
      if (err) res.send(400, err.message); 
      else res.json({deletedMatch: deletedMatch});
    });
  });

  app.post("/api/v1/events/:id/delete", ensureAuthenticated, function (req, res) {
    var matchId = req.params.id;
    api.deleteEvent(matchId, function (err, deletedEvent) {
      if (err) res.send(400, err.message); 
      else res.json({deletedEvent: deletedEvent});
    });
  });
  
  app.post("/api/v1/people/:id/delete", ensureAuthenticated, function (req, res) {
    var matchId = req.params.id;
    api.deletePerson(matchId, function (err, deletedPerson) {
      if (err) res.send(400, err.message); 
      else res.json({deletedPerson: deletedPerson});
    });
  });  
  
  app.post("/api/v1/contacts/:id/delete", ensureAuthenticated, function (req, res) {
    var matchId = req.params.id;
    api.deleteContact(matchId, function (err, deletedContact) {
      if (err) res.send(400, err.message); 
      else res.json({deletedContact: deletedContact});
    });
  });

  //READ

  //get a user by their email
  app.post("/api/v1/users", function (req, res) {
    api.getUsers(function (err, users) {
      if (err) res.send(400, err.message); 
      else res.json({
        users: users 
      });
    }); 
  });

  app.get("/api/v1/users", function (req, res) {
    api.getUsers(function (err, users) {
      if (err) res.send(400, err.message); 
      else res.json({
        users: users 
      });
    }); 
  });

  app.get("/api/v1/people", function (req, res) {
    api.getPeople(function (err, people) {
      if (err) res.send(400, err.message); 
      else res.json({
        people: people 
      });
    });
  });

  app.get("/api/v1/events", function (req, res) {
    api.getEvents(function (err, events) {
      if (err) res.send(400, err.message); 
      else res.json({
        events: events 
      });
    });
  });
  
  app.get("/api/v1/contacts", function (req, res) {
    api.getContacts(function (err, contacts) {
      if (err) res.send(400, err.message); 
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
      if (err) res.send(400, err.message);
      else res.json({
        matches: matches,
        query: querystring
      }); 
    }); 
  });

  app.get("/api/v1/users/:id", function (req, res) {
    api.getUser(req.params.id, function (err, user) {
      if (err) res.send(400, err.message); 
      else res.json({
        user: user
      });
    });
  });

  app.get("/api/v1/matches/featured/pro", function (req, res) {
    api.getFeaturedProMatch(function (err, featuredMatch) {
      if (err) res.send(400, err.message); 
      else res.json({featuredMatch: featuredMatch});
    });
  });

  app.get("/api/v1/matches/featured/community", function (req, res) {
    api.getFeaturedCommunityMatch(function (err, featuredMatch) {
      if (err) res.send(400, err.message); 
      else res.json({featuredMatch: featuredMatch});
    });
  });
};
