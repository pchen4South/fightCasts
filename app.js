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
app.use(express.bodyParser());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());
app.use(express.urlencoded());
app.use(express.json());

var returnIndex = function (req, res) {
  res.render("index", {matches: matches});
};

app.get("/", returnIndex);
app.get("/matches", returnIndex);

//PLAYER
app.get("/create/player", function (req, res) {
  res.render("createPlayer");
});
app.post("/create/player", function(req, res){
  res.send("creating player");
});

//CHARACTER
app.get("/create/character", function (req, res) {
  res.render("createPlayer");
});
app.post("/create/character", function(req, res){
  res.send("creating character");
});

//GAME
app.get("/create/game", function (req, res) {
  res.render("createGame");
});
app.post("/create/game", function(req, res){
  res.send("creating game");
});

//CASTER
app.get("/create/caster", function (req, res) {
  res.render("createCaster");
});
app.post("/create/caster", function(req, res){
  res.send("creating caster");
});

//VIDEO
app.get("/create/video", function (req, res) {
  res.render("createVideo");
});
app.post("/create/video", function(req, res){
  res.send("creating video");
});

//EVENT
app.get("/create/event", function (req, res) {
  res.render("createEvent");
});
app.post("/create/event", function (req, res) {
  res.send("creating event");
});

//CHANNEL
app.get("/create/channel", function (req, res) {
  res.render("createEvent");
});
app.post("/create/channel", function (req, res) {
  res.send("creating channel");
});

//TEAM
app.get("/create/team", function (req, res) {
  res.render("createEvent");
});
app.post("/create/team", function (req, res) {
  res.send("creating team");
});

//PARTICIPANT
app.get("/create/participant", function (req, res) {
  res.render("createEvent");
});
app.post("/create/participant", function (req, res) {
  res.send("creating participant");
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

app.get('/testDB', function(req, res){
  res.send('biatch');
});

app.listen(3000);
