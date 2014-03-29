var mongoose = require('mongoose');
var _ = require('lodash');
var keys = _.keys;
var partial = _.partial;
var forEach = _.forEach;
var prompt = require('prompt');
var async = require('async');

var people = require('./seeds/people');
var events = require('./seeds/events');
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

var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");
      async.series([
        peopleCreation,
        eventsCreation,
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
