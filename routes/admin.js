var api = require('../api');

// function requireLogin(req, res, next) {
  // if (req.session.loggedIn) {
    // next(); // allow the next route to run
  // } else {
    // // require the user to log in
    // res.render("admin/login"); // or render a form, etc.
  // }
// }

module.exports = function (app) {
  //read
  app.get("/admin", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/dashboard", results);
    });
  });
  app.get("/admin/people", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/people", results);
    });
  });
  app.get("/admin/characters", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/characters", results);
    });
  });
  app.get("/admin/games", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/games", results);
    });
  });
    
  app.get("/admin/casters", function (req, res) {
    res.redirect("/admin");
  });

  app.get("/admin/videos", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/videos", results);
    });
  });
  app.get("/admin/events", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/events", results);
    });
  });
  app.get("/admin/channels", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/channels", results);
    });
  });
  app.get("/admin/teams", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/teams", results);
    });
  });
  app.get("/admin/fighters", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/fighters", results);
    });
  });
  app.get("/admin/matches", function (req, res) {
    api.getAll(function (err, results) {
      if(results){
        results.layout = "adminLayout";
      }
      res.render("admin/matches", results);
    });
  });  
  
  app.get("/admin/submittedmatches/:_id", function (req, res) {
    var id = req.params._id;
    
    api.getSubmittedMatch(id, function (err, results) {
      if(results){
        var id = results.id;
        var resultObject = results.matchJson;
        results = resultObject;
        results.id = id;
        results.layout = "adminLayout";
        
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
  
  app.get("/admin/submittedmatches", function (req, res) {
    api.getAll(function (err, results) {      
      if(results){
        results.layout = "adminLayout";
        
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
  app.post("/admin/people", function (req, res) {
    api.createPerson(req.body, function (err, result) {
      res.redirect("/admin/people");
    });
  });

  app.post("/admin/characters", function (req, res) {
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

  app.post("/admin/games", function (req, res) {
    api.createGame(req.body, function (err, result) {
      res.redirect("/admin/games");
    });
  });


  app.post("/admin/videos", function (req, res) {
    api.createVideo(req.body, function (err, result) {
      res.redirect("/admin/videos");
    });
  });

  app.post("/admin/events", function (req, res) {
    api.createEvent(req.body, function (err, result) {
      res.redirect("/admin/events");
    });
  });

  app.post("/admin/channels", function (req, res) {
    api.createChannel(req.body, function (err, result) {
      res.redirect("/admin/channels");
    });
  });

  app.post("/admin/teams", function (req, res) {
    api.createTeam(req.body, function (err, result) {
      res.redirect("/admin/teams");
    });
  });

  app.post("/admin/fighters", function (req, res) {
    api.createFighter(req.body, function (err, result) {
      res.redirect("/admin/fighters");
    });
  });
  
  app.post("/admin/matches", function (req, res){
    api.createMatch(req.body, function (err, result) {
      console.log(err);
      console.log(result);
      res.redirect("/admin/matches");
    });
  });  
  
  app.post("/admin/convertmatches", function (req, res){
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
  app.post("/admin/matches/:_id/approve", function(req,res){
    var id = req.body.id;
    api.getMatch(id, function(err, result){
      api.updateMatchById(id, { $set: { approved: true }}, function(err, result){
        res.redirect("admin/matches");
      })
    })
  });  app.post("/admin/matches/:_id/feature", function(req,res){
    var id = req.body.id;
    api.getMatch(id, function(err, result){
      api.updateMatchById(id, { $set: { featured: true }}, function(err, result){
        res.redirect("admin/matches");
      })
    })
  });  app.post("/admin/matches/:_id/unfeature", function(req,res){
    var id = req.body.id;
    api.getMatch(id, function(err, result){
      api.updateMatchById(id, { $set: { featured: false }}, function(err, result){
        res.redirect("admin/matches");
      })
    })
  });  
  
  app.post("/admin/matches/:_id/unapprove", function(req,res){
    var id = req.body.id;
    api.getMatch(id, function(err, result){
      api.updateMatchById(id, { $set: { approved: false }}, function(err, result){
        res.redirect("admin/matches");
      })
    })
  });
  
  //delete
  app.post("/admin/people/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deletePerson(id, function(err, result){
      console.log("DELETED Person: ", result.name);
      res.redirect("admin/people");
    });
  }); 
  
  app.post("/admin/videos/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteVideo(id, function(err, result){
      console.log("DELETED Video: ", result.name);
      res.redirect("admin/videos");
    });
  });  
  
  app.post("/admin/events/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteEvent(id, function(err, result){
      console.log("DELETED Event: ", result.name);
      res.redirect("admin/events");
    });
  });

  app.post("/admin/channels/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteChannel(id, function(err, result){
      console.log("DELETED Channel: ", result.name);
      res.redirect("admin/channels");
    });
  }); 
  
  app.post("/admin/teams/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteTeam(id, function(err, result){
      console.log("DELETED team: ", result.name);
      res.redirect("admin/teams");
    });
  });  
  
  app.post("/admin/fighters/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteFighter(id, function(err, result){
      console.log("deleted fighter");
      res.redirect("admin/fighters");
    });
  });
  
  app.post("/admin/matches/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteMatch(id, function(err, result){
      console.log("deleted match", result.title);
      res.redirect("admin/matches");
    });
  });  
  
  app.post("/admin/games/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteGame(id, function(err, result){
      console.log("deleted game", result.name);
      res.redirect("admin/games");
    });
  }); 

  app.post("/admin/characters/:_id/delete", function(req, res){
    var id = req.body.id;
    api.deleteCharacter(id, function(err, result){
      console.log("deleted character", result.name);
      res.redirect("admin/characters");
    });
  });
  
};
