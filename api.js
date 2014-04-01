var mongoose = require('mongoose');
var Model = mongoose.Model;
var async = require('async');
var _ = require('lodash');
var isFunction = _.isFunction;
var partial = _.partial;
var map = _.map;
var forEach = _.forEach;
var invoke = _.invoke;
var find = _.find;
var personModel = require('./models/personModel').model;
var eventModel = require('./models/eventModel').model;
var matchModel = require('./models/matchModel').Match;
var fighterModel = require('./models/matchModel').Fighter;
var gamesList = require('./models/gameCharacterData');

var create = function (modelType, data, cb) {
  return modelType.create(data, function (err, res) {
    return cb(err, formatDbResponse(res)); 
  });
};

//create
var createPerson = partial(create, personModel);
var createEvent = partial(create, eventModel);
var createMatch = partial(create, matchModel);

var get = function (modelType, id, cb) {
  model.Type.findById(id, cb);
};

var getMultiple = function (modelType, cb) {
  modelType.find({}, cb)
};

var getPerson = partial(get, personModel);
var getEvent = partial(get, eventModel);
var getMatch = partial(get, matchModel);

var getPeople = partial(getMultiple, personModel);
var getEvents = partial(getMultiple, eventModel);
var getMatches = partial(getMultiple, matchModel);

//mutative, populates characters for a match's fighters
var populateCharacters = function (match) {
  var game = gamesList[match.game];
  if (!game) throw new Error("invalid game id", match.game);

  forEach(match.fighters, function (fighter) {
    var characters = map(fighter.characters, function (character) {
      return find(game.characters, {id: character});
    });
    fighter.characters = characters;
  });
};

//mutative, populates game for a match
var populateGame = function (match) {
  var game = gamesList[match.game];
  if (!game) throw new Error("invalid game id", match.game);

  match.game = game;
};

var getMatchesNested = function (query, cb) {
  if (isFunction(query)) cb = query;

  matchModel.find(query)
  .populate("event casters fighters.person")
  .exec(function (err, matches) {
    if (err) return cb(err);
    var matchObjects = invoke(matches, "toObject");
    forEach(matchObjects, populateCharacters);
    forEach(matchObjects, populateGame);
    cb(null, matchObjects);
  });
};


var getMatchNested = function (id, cb) {
  if (!id) throw new Error("must provide an id!");

  matchModel.findById(id)
  .populate("event casters fighters.person")
  .exec(function (err, match) {
    if (err) return cb(err);
    var matchObject = match.toObject();
    populateCharacters(matchObject);
    populateGame(matchObject);
    cb(null, matchObject);
  });
};

var getAll = function (cb) {
  async.parallel({
    people: getPeople,
    events: getEvents,
    matches: getMatchesNested,
  }, cb);
};

//update
var updateMatchById = function(id, updateOptions, cb){
  matchModel.findByIdAndUpdate(id, updateOptions, function(err, res){
    if (err) cb(err);
    else cb(null, res);
  });
};

//delete
var deleteModelById = function (modelType, id, cb) {
  return modelType.findByIdAndRemove(id, function (err, res) {
    if (err) cb(err);
    else cb(err, formatDbResponse(res)); 
  });
};

var deletePerson = partial(deleteModelById, personModel);
var deleteEvent = partial(deleteModelById, eventModel);
var deleteMatch = partial(deleteModelById, matchModel);

module.exports = {
  deletePerson: deletePerson,
  deleteEvent: deleteEvent,
  deleteMatch: deleteMatch,

  updateMatchById: updateMatchById,

  createPerson: createPerson, 
  createEvent: createEvent,
  createMatch: createMatch,
  
  getAll: getAll,
  getPerson: getPerson, 
  getEvent: getEvent,
  getMatch: getMatch,
  getMatchNested: getMatchNested,
  
  getPeople: getPeople, 
  getEvents: getEvents,
  getMatches: getMatches,
  getMatchesNested: getMatchesNested,
};
