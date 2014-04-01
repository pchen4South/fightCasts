var async = require('async');
var _ = require('lodash');
var isFunction = _.isFunction;
var partial = _.partial;
var map = _.map;
var forEach = _.forEach;
var find = _.find;
var personModel = require('./models/personModel').model;
var eventModel = require('./models/eventModel').model;
var matchModel = require('./models/matchModel').model;
var gamesList = require('./models/gameCharacterData');

var create = function (modelType, data, cb) {
  return modelType.create(data, cb);
};

//create
var createPerson = partial(create, personModel);
var createEvent = partial(create, eventModel);
var createMatch = partial(create, matchModel);

var get = function (modelType, id, cb) {
  modelType.findById(id)
  .lean()
  .exec(cb);
};

var getMultiple = function (modelType, cb) {
  modelType.find({})
  .lean()
  .exec(cb);
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
  .lean()
  .sort("createdAt")
  .populate("event casters fighters.person")
  .exec(function (err, matches) {
    if (err) return cb(err);
    if (!matches) {
      console.log("no matches");
      return cb(null, []);
    }
    forEach(matches, populateCharacters);
    forEach(matches, populateGame);
    //cb(null, matches);
  });
};


var getMatchNested = function (id, cb) {
  if (!id) throw new Error("must provide an id!");

  matchModel.findById(id)
  .lean()
  .populate("event casters fighters.person")
  .exec(function (err, match) {
    if (err) return cb(err);
    if (!match) return cb(null, null);

    populateCharacters(match);
    populateGame(match);
    cb(null, match);
  });
};

var getFeaturedProMatch = function (cb) {
  matchModel.findOne({category: "pro"})
  .lean()
  .sort("-featuredAt")
  .populate("event casters fighters.person")
  .exec(function (err, match) {
    if (err) return cb(err);  
    if (!match) return cb(null, null);

    populateCharacters(match);
    populateGame(match);
    cb(null, match);
  });
};

var getFeaturedCommunityMatch = function (cb) {
  matchModel.findOne({category: "community"})
  .lean()
  .sort("-featuredAt")
  .populate("event casters fighters.person")
  .exec(function (err, match) {
    if (err) return cb(err);  
    if (!match) return cb(null, null);

    populateCharacters(match);
    populateGame(match);
    cb(null, match);
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
  matchModel.findByIdAndUpdate(id, updateOptions, cb);
};

var featureMatch = function (id, cb) {
  matchModel.findByIdAndUpdate(id, {featuredAt: Date.now()}, cb);
};

//delete
var deleteModelById = function (modelType, id, cb) {
  return modelType.findByIdAndRemove(id, cb);
};

var deletePerson = partial(deleteModelById, personModel);
var deleteEvent = partial(deleteModelById, eventModel);
var deleteMatch = partial(deleteModelById, matchModel);

module.exports.deletePerson = deletePerson;
module.exports.deleteEvent = deleteEvent;
module.exports.deleteMatch = deleteMatch;

module.exports.updateMatchById = updateMatchById;

module.exports.featureMatch = featureMatch;

module.exports.createPerson = createPerson; 
module.exports.createEvent = createEvent;
module.exports.createMatch = createMatch;

module.exports.getAll = getAll;
module.exports.getPerson = getPerson; 
module.exports.getEvent = getEvent;
module.exports.getMatch = getMatch;
module.exports.getMatchNested = getMatchNested;
module.exports.getFeaturedProMatch = getFeaturedProMatch;
module.exports.getFeaturedCommunityMatch = getFeaturedCommunityMatch;

module.exports.getPeople = getPeople; 
module.exports.getEvents = getEvents;
module.exports.getMatches = getMatches;
module.exports.getMatchesNested = getMatchesNested;
