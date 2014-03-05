var player = require('./models/playerModel');
var character = require('./models/characterModel');
var game = require('./models/gameModel');
var caster = require('./models/casterModel');
var event = require('./models/eventModel');
var video = require('./models/videoModel');


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

var createVideo = function(req,res){
  video['model'].create({url: req.body.url}, function(err, result){
    if (err){console.log(err)}
    else res.status(200).send('vid created');
  });
}

var createCaster = function(req,res){
  caster['model'].create({name: req.body.name}, function(err, result){
    if (err){console.log(err)}
    else res.status(200).send();
  });
}

var createEvent = function(req,res){
  event['model'].create(
    {
      name: req.body.name,
      date: req.body.date,
      country: req.body.country
    }, function(err, result){
      if (err) {console.log(err)}
      else res.status(200).send('event created');
    }
  );
}

module.exports = {'createPlayer': createPlayer, 
                  'createCharacter': createCharacter,
                  'createGame': createGame,
                  'createCaster': createCaster,
                  'createEvent': createEvent,
                  'createVideo': createVideo
                  }