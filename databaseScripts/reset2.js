var mongoose = require('mongoose');
var _ = require('lodash');
var forEach = _.forEach;
var prompt = require('prompt');
var async = require('async');

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

var createCharacter = function (character, done) {  
  charMod = characterModel.model;
  var newChar = new charMod(character);
  console.log("Character Created: ", newChar.name);
  newChar.save(done);   
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

var findCharactersAndCreateGames = function(game, cb){
  characterModel.model.find({game: game.name}, function(err,res){
    if(err) console.log (err);
    else if (res.length>0){
      gameModel.model.create({name:game.name, _characters: res}, function(err, res){
        if(err) console.log(err);
        console.log("Game created: ", res.name);
      })
    }
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

var characterFind = function(done){
  async.map(games, findCharactersAndCreateGames, done);
}

var characterCreation = function(done){
  async.map(characters, createCharacter, done);
}

var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");

      async.series([characterCreation, characterFind]);
      
      // forEach(games, createGame);
      // forEach(casters, createCaster);
      // forEach(videos, createVideo);      
      // forEach(players, createPlayer);
      
    });
  });
};


prompt.start();

prompt.get("password", function (err, result) {
  resetDb(mongoose);
});
