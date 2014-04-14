var mongoose = require("mongoose");
var through = require("through");
var request = require("request");
var _ = require("lodash");
var forEach = _.forEach;
var uniq = _.uniq;
var map = _.map;
var find = _.find;
var pluck = _.pluck;
var reduce = _.reduce;
var api = require("./api");
var closeDb = mongoose.disconnect.bind(mongoose);
var elasticSearchUri = "http://localhost:9200/fightcasts/matches/";

mongoose.connect('mongodb://localhost:27017/fightCasts');

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

//create flat data structure for storage in elastic search
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

//create flat match inside elastic search
var createFlatMatch = function (flatMatch, cb) {
  var url = elasticSearchUri + flatMatch.id;
  var options = {
    json: flatMatch 
  };
  request.post(url, options, cb);
};

var indexMatch = function (flatMatch) {
  var stream = this;

  //TODO: improve error handling?
  createFlatMatch(flatMatch, function (err, res) {
    if (err) console.log(err);
    stream.queue(flatMatch);
  });
};

var main = function (cb) {
  var flattenStream = through(flattenMatch);
  var indexStream = through(indexMatch, cb);

  api.getMatchesNestedStream()
  .pipe(flattenStream)
  .pipe(indexStream);
};

main(function () {
  closeDb();
  console.log("done");
});
