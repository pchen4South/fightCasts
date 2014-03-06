var mongoose = require('mongoose');
var _ = require('lodash');
var forEach = _.forEach;
var prompt = require('prompt');

var characters = require('./seeds/characters');
var players = require('./seeds/players');
var games = require('./seeds/games');
var casters = require('./seeds/casters');
var videos= require('./seeds/videos');

var gameModel = require('../models/gameModel');
var characterModel = require('../models/characterModel');
var playerModel = require('../models/playerModel');
var casterModel = require('../models/casterModel');
var videoModel = require('../models/videoModel');

var createCharacter = function (character) {
  characterModel.model.create(character, function (err, res) {
    if (err) console.log(err);
    else console.log("Character created: ", res.name); 
  });
};

var createPlayer = function (player) {
  playerModel.model.create(player, function (err, res) {
    if (err) console.log(err);
    else console.log("Player created: ", res.name); 
  });
};

var createGame = function (game) {
  gameModel.model.create(game, function (err, res) {
    if (err) console.log(err);
    else console.log("Game created: ", res.name); 
  });
};

var findCharacters = function(game){
  characterModel.find({name: game}, function(err,res){
    if(err) console.log (err);
    else console.log(res);
  })
}
var createCaster = function (caster) {
  casterModel.model.create(caster, function (err, res) {
    if (err) console.log(err);
    else console.log("Caster created: ", res.name); 
  });
};

var createVideo = function (video) {
  videoModel.model.create(video, function (err, res) {
    if (err) console.log(err); 
    else console.log("Video created: ", res.name, res.url);
  });
};


var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");
      
      forEach(characters, createCharacter);
      forEach(players, createPlayer);
      forEach(games, findCharacters);
      // forEach(games, createGame);
      forEach(casters, createCaster);
      forEach(videos, createVideo);
    });
  });
};


prompt.start();

prompt.get("password", function (err, result) {
  if (result.password === "admin") resetDb(mongoose);
  else console.log("Invalid password");
});
