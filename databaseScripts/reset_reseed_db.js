var mongoose = require('mongoose');
var _ = require('lodash');
var forEach = _.forEach;
var prompt = require('prompt');
var characters = require('./characters');
var players = require('./players');
var characterModel = require('../models/characterModel');
var playerModel = require('../models/playerModel');

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

var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");
      
      forEach(characters, createCharacter);
      forEach(players, createPlayer);
    });
  });
};


prompt.start();

prompt.get("password", function (err, result) {
  if (result.password === "admin") resetDb(mongoose);
  else console.log("Invalid password");
});
