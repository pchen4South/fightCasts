var player = require('./models/playerModel');
var character = require('./models/characterModel');
var game = require('./models/gameModel');
var caster = require('./models/casterModel');



var createPlayer = function(req,res){
  player['model'].create({name: req.body.name}, function(err, result){
    if (err){console.log(err)}
    else res.status(200).send();
  });
}

var createCharacter = function(req,res){
  character['model'].create({name: req.body.name}, function(err, result){
    if (err){console.log(err)}
    else res.status(200).send();
  });
}

var createGame = function(req,res){
  game['model'].create({name: req.body.name}, function(err, result){
    if (err){console.log(err)}
    else res.status(200).send();
  });
}

var createCaster = function(req,res){
  caster['model'].create({name: req.body.name}, function(err, result){
    if (err){console.log(err)}
    else res.status(200).send();
  });
}

module.exports = {'createPlayer': createPlayer, 
                  'createCharacter': createCharacter,
                  'createGame': createGame,
                  'createCaster': createCaster}