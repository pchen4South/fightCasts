var querystring = require('querystring');
var mongoose = require('mongoose');
var _ = require('lodash');
var keys = _.keys;
var partial = _.partial;
var forEach = _.forEach;
var map = _.map;
var prompt = require('prompt');
var async = require('async');

var people = require('./seeds/people');
var events = require('./seeds/events');
var matches = require('./seeds/matches');
var games = require('../models/gameCharacterData');

var personModel = require('../models/personModel').model;
var eventModel = require('../models/eventModel').model;
var matchModel = require('../models/matchModel').model;

var peopleCreation = function(done){
  async.map(people, partial(create, personModel), done);
};

var eventsCreation = function(done){
  async.map(events, partial(create, eventModel), done);
};

var extractVideoId = function (videoUrl) {
  var queries = videoUrl.split("?")[1];
  return querystring.parse(queries)["v"];
};

var createMatch = function (matchData, cb) {
  async.parallel({
    casters: async.apply(async.map, matchData.casters, findPerson),
    fighters: async.apply(async.map, matchData.fighters, findFighter),
    event: async.apply(findEvent, matchData.event),
  }, function (err, results) {
    if (err) console.log(err);
    var match = {
      game: matchData.game,
      title: matchData.title,
      description: matchData.description,
      category: matchData.category,
      playedAt: matchData.playedAt,
      featuredAt: matchData.featuredAt,
      videos: map(matchData.videos, extractVideoId),
      fighters: results.fighters,
      casters: results.casters,
      event: results.event,
    };
    create(matchModel, match, cb);
  });
};

var matchesCreation = function(done) {
  async.map(matches, createMatch, done);
};

var find = function(modelType, query, cb){
  modelType.findOne(query, cb);
};

var findPerson = partial(find, personModel);
var findEvent = partial(find, eventModel);
var findFighter = function (fighterData, cb) {
  find(personModel, {name: fighterData.name}, function (err, person) {
    var fighter = {
      person: person,
      characters: fighterData.characters 
    };
    cb(err, fighter);
  }); 
};

var create = function(modelType, data, cb){
  modelType.create(data, cb);
};

var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");
      async.series([
        peopleCreation,
        eventsCreation,
        matchesCreation
      ], function(err, res){
        if (err) console.log (err);
        mongoose.disconnect();
      });
    });
  });
};

resetDb(mongoose);
//
//prompt.start();
//
//prompt.get("password", function (err, result) {
//  if (result.password === "admin") resetDb(mongoose);
//  else console.log("Invalid password");
//});
