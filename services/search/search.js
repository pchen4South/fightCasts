var request = require("request");
var _ = require("lodash");
var forEach = _.forEach;
var uniq = _.uniq;
var map = _.map;
var find = _.find;
var pluck = _.pluck;
var isFunction = _.isFunction;
var cloneDeep = _.cloneDeep;
var reduce = _.reduce;
var api = require('../../api');
var elasticSearchUri = require("../../config.json").services.search.uri;

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
  return {
    id: match._id,
    createdAt: match.createdAt,
    updatedAt: match.updatedAt,
    playedAt: match.playedAt,
    game_id: match.game ? match.game.id : null,
    gameName: match.game ? match.game.name : "",
    gameNickname: match.game ? match.game.nickname : "",
    title: match.title,
    description: match.description,
    category: match.category,
    eventName: match.event ? match.event.name : "",
    casters: pluck(match.casters, "name"),
    characters: match.fighters ? extractCharacters(match.fighters) : [],
    people: match.fighters ? extractPeople(match.fighters) : [],
    videos: match.videos
  }
};

/* 
 * create flat representation of the match object
 * index the object by id into elastic search
 * call provided callback
* */
var indexMatch = function (match, cb) {
  var flatMatch = flattenMatch(match);
  var url = elasticSearchUri + "/matches/" + flatMatch.id;
  var options = {
    json: flatMatch 
  };
  request.post(url, options, cb);
};

//extract ids from returned ES query
var extractIdsFrom = function (result) {
  var ids;

  try {
    ids = pluck(result.hits.hits, "_id");
  } catch (e) {
    ids = []; 
  } finally {
    return ids; 
  }
};

//pass in a search string and get back an array of ids
var getMatchIdsForQuery = function (query, cb) {
  var url = elasticSearchUri + "/matches/_search";
  var options = {
    json: {
      query: {
        flt: {
          like_text: query 
        } 
      } 
    }
  };

  request.post(url, options, function (err, req, body) {
    return cb(err, extractIdsFrom(body));
  });
};

//combines the search api and mongoose to get actual matches
//N.B. THIS MAY CHANGE IF ACTUAL MATCHES ARE INDEXED IN ES
var getMatchesForSearch = function (search, query, cb) {
  getMatchIdsForQuery(search, function (err, ids) {
    var totalQuery;

    //allow for optional query parameter
    if (isFunction(query)) {
      totalQuery = {};
      cb = query;
    } else {
      totalQuery = cloneDeep(query);   
    }

    totalQuery["_id"] = {
      "$in": ids 
    };

    api.getMatchesNested(totalQuery, cb);
  });
};

module.exports.indexMatch = indexMatch;
module.exports.getMatchIdsForQuery = getMatchIdsForQuery;
module.exports.getMatchesForSearch = getMatchesForSearch;
