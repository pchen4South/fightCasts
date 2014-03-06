var mongoose = require('mongoose');
var characters = require('./characters');
var players = require('./players');
var characterModel = require('../models/characterModel');
var playerModel = require('../models/playerModel');
var gameList = require('./games');
var async = require('async');


var playercreate = function(player){
  playerModel.model.create(player, function(err, res){
    if(err){ console.log(err)}
    // else
      // console.log ("Player created: ", res.name);        
    })
}

var charactercreate = function(character){
  characterModel.model.create(character, function(err, res){
    if(err){ console.log(err)}
    // else
      // console.log ("Character created: ", res.name);        
    })
}

var createPlayers = function(){
  async.each(players, playercreate);
}

var createCharacters = function(){
  async.each(characters, charactercreate);
}

var createGames = function(){}

mongoose.connect('mongodb://localhost:27017/fightCasts', function(){
  mongoose.connection.db.dropDatabase(function(err){
    console.log("database Dropped");
    
    async.parallel([createCharacters, createPlayers], function(err, res){
      if (err) console.log (err);
      console.log("done"); 
    }); 

  })
})

