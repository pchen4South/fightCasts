var api = require('../api');

module.exports = function (app) {
  //read
  app.get("/admin", function (req, res) {
    res.render("admin/dashboard");
  });
  app.get("/admin/players", function (req, res) {
    res.render("admin/players");
  });
  app.get("/admin/characters", function (req, res) {
    res.render("admin/characters");
  });
  app.get("/admin/games", function (req, res) {
    res.render("admin/games");
  });
  app.get("/admin/casters", function (req, res) {
    res.render("admin/casters");
  });
  app.get("/admin/videos", function (req, res) {
    res.render("admin/videos");
  });
  app.get("/admin/events", function (req, res) {
    res.render("admin/events");
  });
  app.get("/admin/channels", function (req, res) {
    res.render("admin/channels");
  });
  app.get("/admin/teams", function (req, res) {
    res.render("admin/teams");
  });
  app.get("/admin/fighters", function (req, res) {
    res.render("admin/fighters");
  });
  app.get("/admin/matches", function (req, res) {
    res.render("admin/matches");
  });

  //create
  app.post("/admin/players", api.createPlayer);
  app.post("/admin/characters", api.createCharacter);
  app.post("/admin/games", api.createGame);
  app.post("/admin/casters", api.createCaster);
  app.post("/admin/videos", api.createVideo);
  app.post("/admin/events", api.createEvent);
  app.post("/admin/channels", api.createChannel);
  app.post("/admin/teams", api.createTeam);
  app.post("/admin/fighters", function (req, res) {
    res.send("creating fighter");
  });
  app.post("/admin/matches", function (req, res){
    res.send("creating match");
  });
  app.post("/admin/players", function (req, res) {
    api.createPlayer(req.body, function (err, result) {
      res.redirect("/admin/players");
    });
  });
  app.post("/admin/characters", api.createCharacter);
  app.post("/admin/games", api.createGame);
  app.post("/admin/casters", api.createCaster);
  app.post("/admin/videos", api.createVideo);
  app.post("/admin/events", api.createEvent);
  app.post("/admin/channels", api.createChannel);
  app.post("/admin/teams", api.createTeam);
  app.post("/admin/fighters", function (req, res) {
    res.send("creating fighter");
  });
  app.post("/admin/matches", function (req, res){
    res.send("creating match");
  });
};
