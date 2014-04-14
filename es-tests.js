var _ = require("lodash");
var forEach = _.forEach;
var uniq = _.uniq;
var map = _.map;
var find = _.find;
var pluck = _.pluck;
var reduce = _.reduce;
var JSONStream = require("JSONStream");
var through = require("through");
var request = require("request");
var api = require("./api");
var mongoose = require("mongoose");
var matchModel = require("./models/matchModel").model;
var gamesList = require('./models/gameCharacterData');
var closeDb = mongoose.disconnect.bind(mongoose);
var elasticSearchUri = "http://localhost:9200/fightcasts/matches/";

mongoose.connect('mongodb://localhost:27017/fightCasts');

//create flat match inside elastic search
var createFlatMatch = function (flatMatch, cb) {
  var url = elasticSearchUri + flatMatch.id;
  var options = {
    json: flatMatch 
  };
  request.post(url, options, cb);
};


//COPIED FROM API.JS FOR THE MOMENT
var populateCharacters = function (match) {
  var game = gamesList["1"];
  //if (!game) throw new Error("invalid game id", match.game);

  forEach(match.fighters, function (fighter) {
    var characters = map(fighter.characters, function (character) {
      return find(game.characters, {id: character});
    });
    fighter.characters = characters;
  });
};

//mutative, populates game for a match
var populateGame = function (match) {
  var game = gamesList["1"];
  if (!game) throw new Error("invalid game id", match.game);

  match.game = game;
};

var populateMatch = function (match) {
  populateCharacters(match); 
  populateGame(match);
  this.queue(match);
};

//helper to extract array of character names from fighters
var extractCharacters = function (fighters) {
  return uniq(reduce(fighters, function (result, fighter) {
    return result.concat(pluck(fighter.characters, "name"));
  }, []));
};

//helper to extract array of names of people in this match
var extractPeople = function (fighters) {
  return map(fighters, function (fighter) {
    return fighter.person.name;
  });
};

var flattenMatch = function (match) {
  var flatMatch = {
    id: match._id,
    createdAt: match.createdAt,
    updatedAt: match.updatedAt,
    playedAt: match.playedAt,
    gameName: match.game.name,
    gameNickname: match.game.nickname,  
    title: match.title,
    description: match.description,
    category: match.category,
    eventName: match.event ? match.event.name : "",
    casters: pluck(match.casters, "name"),
    characters: match.fighters ? extractCharacters(match.fighters) : [],
    people: match.fighters ? extractPeople(match.fighters) : [],
    videos: match.videos
  }
  this.queue(flatMatch);
};

var streamMatches = function () {
  return matchModel.find()
  .lean()
  .populate("event casters fighters.person")
  .stream();
};

var indexMatch = function (flatMatch) {
  var stream = this;

  createFlatMatch(flatMatch, function (err, res) {
    console.log(err);
    console.log(res);
    stream.queue(flatMatch);
  });
};

var main = function (cb) {
  var populateStream = through(populateMatch);
  var flattenStream = through(flattenMatch);
  var indexStream = through(indexMatch, cb);

  streamMatches()
  .pipe(populateStream)
  .pipe(flattenStream)
  .pipe(indexStream);

  //matchStream.on("data", function (match) {
  //  indexMatch(match);
  //}); 
  //matchStream.on("end", cb);
  //matchStream.on("error", console.error.bind(console));
};

main(function () {
  closeDb();
  console.log("done");
});
