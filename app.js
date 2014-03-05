var express = require('express');
var exphbs = require('express3-handlebars');
var _ = require('lodash');
var find = _.find;
var app = express();
var matches = require('./matches');
var api = require('./api');

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.engine(".handlebars", exphbs({defaultLayout: "main"}));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());

var returnIndex = function (req, res) {
  res.render("index", {matches: matches});
};

app.get("/", returnIndex);
app.get("/matches", returnIndex);

//DASH BOARD
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

//PLAYER
app.get("/create/player", function (req, res) {
  res.render("createPlayer");
});
app.post("/create/player", api.createPlayer);
app.post("/api/v1/players", api.createPlayer);

//CHARACTER
app.get("/create/character", function (req, res) {
  res.render("createCharacter");
});
app.post("/create/character", api.createCharacter);
app.post("/api/v1/characters", api.createCharacter);

//GAME
app.get("/create/game", function (req, res) {
  res.render("createGame");
});
app.post("/create/game", api.createGame);
app.post("/api/v1/games", api.createGame);

//CASTER
app.get("/create/caster", function (req, res) {
  res.render("createCaster");
});
app.post("/create/caster", api.createCaster);
app.post("/api/v1/casters", api.createCaster);

//VIDEO
app.get("/create/video", function (req, res) {
  res.render("createVideo");
});
app.post("/create/video", api.createVideo);
app.post("/api/v1/videos", api.createVideo);

//EVENT
app.get("/create/event", function (req, res) {
  res.render("createEvent");
});
app.post("/create/event", api.createEvent);
app.post("/api/v1/events", api.createEvent);

//CHANNEL
app.get("/create/channel", function (req, res) {
  res.render("createChannel");
});
app.post("/create/channel", api.createChannel);
app.post("/api/v1/channels", api.createChannel);

//TEAM
app.get("/create/team", function (req, res) {
  res.render("createTeam");
});
app.post("/create/team", api.createTeam);
app.post("/api/v1/teams", api.createTeam);

//FIGHTER
app.get("/create/fighter", function (req, res) {
  res.render("createFighter");
});
app.post("/create/fighter", function (req, res) {
  res.send("creating fighter");
});

//MATCH
app.get("/create/match", function (req, res) {
  res.render("createMatch");
});
app.post("/create/match", function(req, res){
  res.send("creating match");
});

app.get('/matches/:id', function (req, res) {
  var id = Number(req.params.id)
    , match = find(matches, {id: id});

  res.render("match", match);
});

app.listen(3000);
