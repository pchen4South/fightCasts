var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fightCasts');

var async = require('async');

var characters = require('./seeds/characters');
var players = require('./seeds/players');
var games = require('./seeds/games');
var casters = require('./seeds/casters');
var videos = require('./seeds/videos');
var events = require('./seeds/events');
var channels = require('./seeds/channels');
var teams = require('./seeds/teams');

var gameModel = require('../models/gameModel');
var characterModel = require('../models/characterModel');
var playerModel = require('../models/playerModel');
var casterModel = require('../models/casterModel');
var videoModel = require('../models/videoModel');
var eventModel = require('../models/eventModel');
var channelModel = require('../models/channelModel');
var teamModel = require('../models/teamModel');
var matchModel = require('../models/matchModel');


// in progress, need to create fighter first then match



async.waterfall([
  function(callback){
    fighterModel.model.find({name: "Falco"}, function(err,res){
      if(err){callback(null);}
      else
        callback(null, res);
    });
  },
  function(character, callback){
    playerModel.model.find({name: "Pete"}, 
      {name: "Steve"}, function(err,res){
        if(err){callback(null);}
        else
          callback(null, res, character);
    });
  },
  function(players, character, callback){
    console.log(players, character);
    callback(null, 'done');
  }
], function(err, done){
  console.log(done, err, "final");
  }
)