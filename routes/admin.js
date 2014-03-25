var api = require('../api');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(user, password, done){
    if (user && password){
      if (user == "admin" && password == "jibob682")
        return done(null, {id:1, user:user});
      else
        return done(null, false);
    } else
        return done(null, false);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/admin/login');
}

module.exports = function (app) {
  
  app.post('/admin/login', 
    passport.authenticate('local', { failureRedirect: "/admin/login",
                                   successRedirect: "/admin"})
  );
  
  app.get("/admin/login", function(req,res){
    res.render('login', {layout: "adminLayout"});
  });
    
  //read
  app.get("/admin", ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        console.log(req.user);
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/dashboard", results);
      });
  });
  app.get("/admin/people",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/people", results);
      });
    });
  app.get("/admin/characters",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/characters", results);
      });
  });
  app.get("/admin/games",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/games", results);
      });
    });
    
  app.get("/admin/casters",  ensureAuthenticated, 
    function (req, res) {
      res.redirect("/admin");
  });

  app.get("/admin/videos",  ensureAuthenticated, 
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/videos", results);
      });
  });
  app.get("/admin/events",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/events", results);
      });
  });
  app.get("/admin/channels",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/channels", results);
      });
  });
  app.get("/admin/teams",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/teams", results);
      });
  });
  app.get("/admin/fighters",  ensureAuthenticated,  
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/fighters", results);
      });
  });
  app.get("/admin/matches",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
        }
        res.render("admin/matches", results);
      });
  });  
  
  app.get("/admin/submittedmatches/:_id",  ensureAuthenticated,
    function (req, res) {
      var id = req.params._id;
      
      api.getSubmittedMatch(id, function (err, results) {
        if(results){
          var id = results.id;
          var resultObject = results.matchJson;
          results = resultObject;
          results.id = id;
          results.layout = "adminLayout";
          results.user = req.user.user;
          
          api.getAll(function(allErr, allRes){
            if (allErr){res.redirect("admin/submittedmatches")}
            else
              results.all = allRes;
              res.render("admin/submittedmatch", results);
          });
          
        }
        else (res.redirect("admin/submittedmatches"));

      });
  });
  
  app.get("/admin/submittedmatches",  ensureAuthenticated,
    function (req, res) {
      api.getAll(function (err, results) {      
        if(results){
          results.layout = "adminLayout";
          results.user = req.user.user;
          
          var submittedMatches = results.submittedMatches;
          var matches = [];
          
          for (var i = 0; i < submittedMatches.length; i++){
              matches[i] = submittedMatches[i].matchJson;
              matches[i].id = submittedMatches[i].id;
          }
          results.submittedMatches = matches;       
        }
        res.render("admin/submittedmatches", results);
      });
  });

  //create
  app.post("/admin/people",  ensureAuthenticated,
    function (req, res) {
      api.createPerson(req.body, function (err, result) {
        res.redirect("/admin/people");
      });
  });

  app.post("/admin/characters",  ensureAuthenticated,
    function (req, res) {
      var character = req.body;
      var game = character.game;
      switch(game){
        case "Super Smash Brothers Melee":
          character.game = "SSBM";
          break;
        case "Super Street Fighter 4 AE":
          character.game = "SS4AE";
          break;
      }   
      api.createCharacter(character, function (err, result) {
        res.redirect("/admin/characters");
      });
    });

  app.post("/admin/games",  ensureAuthenticated,
    function (req, res) {
      api.createGame(req.body, function (err, result) {
        res.redirect("/admin/games");
      });
  });


  app.post("/admin/videos",  ensureAuthenticated,
    function (req, res) {
      api.createVideo(req.body, function (err, result) {
        res.redirect("/admin/videos");
      });
  });

  app.post("/admin/events",  ensureAuthenticated,
    function (req, res) {
      api.createEvent(req.body, function (err, result) {
        res.redirect("/admin/events");
      });
  });

  app.post("/admin/channels", ensureAuthenticated,
    function (req, res) {
      api.createChannel(req.body, function (err, result) {
        res.redirect("/admin/channels");
      });
  });

  app.post("/admin/teams",  ensureAuthenticated,
    function (req, res) {
      api.createTeam(req.body, function (err, result) {
        res.redirect("/admin/teams");
      });
  });

  app.post("/admin/fighters",  ensureAuthenticated,
    function (req, res) {
      api.createFighter(req.body, function (err, result) {
        res.redirect("/admin/fighters");
      });
  });
  
  app.post("/admin/matches",  ensureAuthenticated,
    function (req, res){
      api.createMatch(req.body, function (err, result) {
        console.log(err);
        res.redirect("/admin/matches");
      });
  });  
  
  app.post("/admin/convertmatches",  ensureAuthenticated,
    function (req, res){
      api.createMatch(req.body, function (err, result) {      
        var convertedMatchId = req.body.convertedMatch
        if(result){
          api.deleteSubmittedMatch(convertedMatchId, function(err, result)
          {
            if(result){
              console.log("deleted the submitted match and created match");
            }
            res.redirect("/admin/matches");
          });
        }
      });
  });

  //update
  app.post("/admin/matches/:_id/approve",  ensureAuthenticated,
    function(req,res){
      var id = req.body.id;
      api.getMatch(id, function(err, result){
        api.updateMatchById(id, { $set: { approved: true }}, function(err, result){
          res.redirect("admin/matches");
        })
      })
  });  
  
  app.post("/admin/matches/:_id/feature",  ensureAuthenticated,
    function(req,res){
      var id = req.body.id;
      api.getMatch(id, function(err, result){
        api.updateMatchById(id, { $set: { featured: true }}, function(err, result){
          res.redirect("admin/matches");
        })
      })
  }); 

  app.post("/admin/matches/:_id/unfeature",  ensureAuthenticated,
    function(req,res){
      var id = req.body.id;
      api.getMatch(id, function(err, result){
        api.updateMatchById(id, { $set: { featured: false }}, function(err, result){
          res.redirect("admin/matches");
        })
      })
  });  
  
  app.post("/admin/matches/:_id/unapprove",  ensureAuthenticated,
    function(req,res){
      var id = req.body.id;
      api.getMatch(id, function(err, result){
        api.updateMatchById(id, { $set: { approved: false }}, function(err, result){
          res.redirect("admin/matches");
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
  
  app.post("/admin/videos/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteVideo(id, function(err, result){
        console.log("DELETED Video: ", result.name);
        res.redirect("admin/videos");
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

  app.post("/admin/channels/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteChannel(id, function(err, result){
        console.log("DELETED Channel: ", result.name);
        res.redirect("admin/channels");
      });
  }); 
  
  app.post("/admin/teams/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteTeam(id, function(err, result){
        console.log("DELETED team: ", result.name);
        res.redirect("admin/teams");
      });
  });  
  
  app.post("/admin/fighters/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteFighter(id, function(err, result){
        console.log("deleted fighter");
        res.redirect("admin/fighters");
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
  
  app.post("/admin/games/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteGame(id, function(err, result){
        console.log("deleted game", result.name);
        res.redirect("admin/games");
      });
  }); 

  app.post("/admin/characters/:_id/delete",  ensureAuthenticated,
    function(req, res){
      var id = req.body.id;
      api.deleteCharacter(id, function(err, result){
        console.log("deleted character", result.name);
        res.redirect("admin/characters");
      });
  });
  
};
