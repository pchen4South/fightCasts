var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var api = require('../api');
var gameData = require('../models/gameCharacterData');

passport.use(new LocalStrategy(function(user, password, done){
  if (user && password) {
    if (user == "admin" && password == "jibob682") {
      return done(null, {id:1, user:user});
    } else return done(null, false);
  } else return done(null, false);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var ensureAuthenticated = function (req, res, next) {
  return next();
  //if (req.isAuthenticated()) return next();
  //else res.redirect('/admin/login');
}

module.exports = function (app) {
  //read
  app.get("/admin", function (req, res) {
      res.render("admin", {layout: "adminLayout"});
  });

  app.get("/admin/people", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
        results.games = gameData;
      }
      res.render("admin/people", results);
    });
  });

  app.get("/admin/events", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.games = gameData;
        results.layout = "adminLayout";
      }
      res.render("admin/events", results);
    });
  });

  app.get("/admin/matches", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
        results.games = gameData;
      }
      res.render("admin/matches", results);
    });
  });  

  app.get("/admin/featuredMatches", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.games = gameData;
        results.layout = "adminLayout";
      }
      res.render("admin/featuredMatches", results);
    });
  });  
  
  //create
  app.post("/admin/people", ensureAuthenticated,
    function (req, res) {
      api.createPerson(req.body, function (err, result) {
        res.redirect("/admin/people");
      });
  });

  app.post("/admin/events",  ensureAuthenticated,
    function (req, res) {
      api.createEvent(req.body, function (err, result) {
        res.redirect("/admin/events");
      });
  });

  app.post("/admin/matches", function (req, res){
    api.createMatch(req.body, function (err, result) {
      res.redirect("/admin/matches");
    });
  });  

  app.post("/admin/featuredMatches", function (req, res){
    var matchId = req.body.match;

    if (!matchId) return res.redirect("admin/featuredMatches");

    api.getMatch(matchId, function (err, match) {
      if (err) return res.redirect("/admin/featuredMatches");
      if (!match) return res.redirect("/admin/featuredMatches");
      var featuredMatchHash = {
        match: match.id,
        category: match.category,
        game: match.game   
      }
      api.createFeaturedMatch(featuredMatchHash, function (err, result) {
        res.redirect("admin/featuredMatches"); 
      });
    });
  });  
  
  app.post("/admin/matches/:_id/feature", function(req,res){
    var id = req.body.id;
    api.getMatch(id, function(err, result){
      api.createFeaturedMatch({match: result.id, game: result.game, category: result.category}, function(err, result){
         api.updateMatchById(id, { $set: { featured: true }}, function(err, result){
          res.redirect("admin/matches");
        })
      })
    })
  });  

  //delete
  app.post("/admin/people/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deletePerson(id, function(err, result){
        console.log("DELETED Person: ", result.name);
        res.redirect("admin/people");
      });
  }); 
  
  app.post("/admin/events/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteEvent(id, function(err, result){
        console.log("DELETED Event: ", result.name);
        res.redirect("admin/events");
      });
  });

  app.post("/admin/matches/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteMatch(id, function(err, result){
        console.log("deleted match", result.title);
        res.redirect("admin/matches");
      });
  });  
};
