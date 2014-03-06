var mongoose = require('mongoose');
var characters = require('./characters');
var players = require('./players');
var characterModel = require('../models/characterModel');
var playerModel = require('../models/playerModel');

mongoose.connect('mongodb://localhost:27017/fightCasts', function(){
  mongoose.connection.db.dropDatabase(function(err){
    console.log("database Dropped");
    
    for(var i = 0; i < characters.length; i++){
      characterModel.model.create(characters[i], function(err, res){
        if(err){ console.log(err)}
        else
          console.log ("Character created: ", res.name);               
      })
    }
    
    for(var j = 0; j < players.length; j++){
      playerModel.model.create(players[j], function(err, res){
        if(err){ console.log(err)}
        else
          console.log ("Player created: ", res.name);               
      })
    }
    
  })
})

