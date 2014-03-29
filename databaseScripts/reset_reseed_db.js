var mongoose = require('mongoose');
var _ = require('lodash');
var keys = _.keys;
var partial = _.partial;
var forEach = _.forEach;
var prompt = require('prompt');
var async = require('async');

var people = require('./seeds/people');
var events = require('./seeds/events');
var matches = require('./seeds/matches');
var games = require('../models/gameCharacterData');

var personModel = require('../models/personModel');
var eventModel = require('../models/eventModel');
var matchModel = require('../models/matchModel');
var featuredMatchModel = require('../models/featuredMatchModel');

var peopleCreation = function(done){
  async.map(people, partial(create, personModel.model), done);
};

var eventsCreation = function(done){
  async.map(events, partial(create, eventModel.model), done);
};

var matchCreation = function(done){
  async.map(matches, findModelsAndCreateMatches, done);
}

var find = function(modelType, query, done){
  modelType.model.find({name: query}, function(err, res){
    if (err) { 
      console.log(err);
      done(err);
    }
    else{
      done(null,res);
    }
  });
};

var findPersonForCaster = function(casterName, cb){
  personModel.model.find({name: casterName}, function(err,res){
    if (err){
      cb(err);
    }
    else
    {
     cb(err, res);
    }
  });
}


var findCasters = function(casters, cb){
  async.map(casters, findPersonForCaster, cb);  
};

var findModelsAndCreateMatches  = function(match, done){
  async.parallel([
    //match.title -> title
    async.apply(findCasters, match.casterNames),
    async.apply(find, eventModel, match.eventName),
  ], function(err, results){
    var casterArray = results[2];
    var event = results[4][0];
    var casters = cleanNestedArray(casterArray);
    
    //results is an array of all the models
    //results[0] is an array of [{playerJSON}]
    matchModel.model.create({
      title: match.title,
      description: match.description,
      game: match.game,
      category: match.category
      _casters: casters,
      _event: event,
    }, function(err,res){
        if (err) done(err);
        else done(null, res);      
    });
  });
};

var cleanNestedArray = function(arr){
  var cleaned = [];
   
  for(var i = 0; i < arr.length; i++){
    cleaned[i] = arr[i][0];
  }
  //console.log(cleaned);
  return cleaned;
}


var create = function(modelType, data, cb){
  modelType.create(data, function(err, res){
    if (err) { 
      console.log(err);
      cb(err);
    }
    else{
      //console.log(modelType.modelName + "created: ", res.name);
      cb(null,res);
    }
  });  
}

var featuredMatchCreation = function(cb){
  matchModel.model.find({}, function(err, res){
    console.log(res[3]);
    featuredMatchModel.model.create({_match: res[0], game: res[0].game, category: res[0].category}, function(err,result){
       featuredMatchModel.model.create({_match: res[3], game: res[3].game, category: res[3].category}, function(err,result){
          console.log(res);
          cb(null,res);
      })
    })
   })
}

var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");
      async.series([
        peopleCreation,
        eventsCreation,
        matchCreation,
        featuredMatchCreation
      ], function(err, res){
        if (err) console.log (err);
        else mongoose.disconnect();
      });
    });
  });
};

prompt.start();

prompt.get("password", function (err, result) {
  if (result.password === "admin") resetDb(mongoose);
  else console.log("Invalid password");
});
