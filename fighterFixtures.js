var mongoose = require('mongoose');
var fighter = require('./models/fighterModel.js')['model'];
var async = require('async');

var player = require('./models/playerModel')['model'];
var character = require('./models/characterModel')['model'];

// var query = player.find({name: 'pete'}, function(err, res){
  // if (err) throw err;
  // console.log(res[0].name);
// });

async.parallel({ 
  player: function(cb){
    player.find({name: 'steve'}, cb);
  },
  character: function(cb){
    character.find({name: 'akuma'}, cb);
  }
},
  function(err, results){
  
    fighter.create({
      _player: results['player'][0]._id,
      _character: results['character'][0]._id
    })
    
});