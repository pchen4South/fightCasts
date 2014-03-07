var api = require('../api');

module.exports = function (app) {
  //read
  app.get("/admin", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/dashboard", results);
    });
  });
  app.get("/admin/people", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/people", results);
    });
  });
  app.get("/admin/characters", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/characters", results);
    });
  });
  app.get("/admin/games", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/games", results);
    });
  });

  app.get("/admin/videos", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/videos", results);
    });
  });
  app.get("/admin/events", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/events", results);
    });
  });
  app.get("/admin/channels", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/channels", results);
    });
  });
  app.get("/admin/teams", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/teams", results);
    });
  });
  app.get("/admin/fighters", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/fighters", results);
    });
  });
  app.get("/admin/matches", function (req, res) {
    api.getAll(function (err, results) {
      res.render("admin/matches", results);
    });
  });

  //create
  app.post("/admin/people", function (req, res) {
    api.createPerson(req.body, function (err, result) {
      res.redirect("/admin/people");
    });
  });

  app.post("/admin/characters", function (req, res) {
    api.createCharacter(req.body, function (err, result) {
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
};
