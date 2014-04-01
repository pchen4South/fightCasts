var _ = require('lodash')
var map = _.map;
var invoke = _.invoke;
var transform = _.transform;
var forEach = _.forEach;
var isFunction = _.isFunction;
var find = _.find;
var api = require('./api');
var mongoose = require('mongoose');
var matchModel = require('./models/matchModel').Match;
var fighterModel = require('./models/matchModel').Fighter;
var gamesList = require('./models/gameCharacterData');

mongoose.connect('mongodb://localhost:27017/fightCasts');

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

var populateGame = function (match) {
  var game = gamesList[match.game];
  if (!game) throw new Error("invalid game id", match.game);

  match.game = game;
};

var getMatchesNested = function (query, cb) {
  if (isFunction(query)) cb = query;
  matchModel.find()
  .populate("event casters fighters.person")
  .exec(function (err, matches) {
    if (err) return cb(err);
    var matchObjects = invoke(matches, "toObject");
    forEach(matchObjects, populateCharacters);
    forEach(matchObjects, populateGame);
    cb(null, matchObjects);
  });
};

getMatchesNested(function (err, matches) {
  console.log(err);
  console.log(JSON.stringify(matches, null, 6));
  mongoose.disconnect();
});
