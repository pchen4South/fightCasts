var async = require('async');
var _ = require('lodash');
var partial = _.partial;
var map = _.map;
var person = require('./models/personModel');
var character = require('./models/characterModel');
var game = require('./models/gameModel');
var event = require('./models/eventModel');
var video = require('./models/videoModel');
var channel = require('./models/channelModel');
var team = require('./models/teamModel');
var fighter = require('./models/fighterModel');
var match = require('./models/matchModel');
var submittedMatch = require('./models/submittedMatchModel');

var formatDbResponse = function (result) {
  var cleaned;

  if (result) {
   cleaned = result.toObject();
   cleaned.id = result._id;
   delete cleaned._id;
   delete cleaned.__v;
   return cleaned;
  } else cleaned = null;
  return cleaned;
};

var create = function (modelType, data, cb) {
  return modelType.create(data, function (err, res) {
    return cb(err, formatDbResponse(res)); 
  });
};

//create
var createPerson = partial(create, person.model);
var createGame = partial(create, game.model);
var createVideo = partial(create, video.model);
var createEvent = partial(create, event.model);
var createChannel = partial(create, channel.model);
var createTeam = partial(create, team.model);
var createSubmittedMatch = partial(create, submittedMatch.model);

var createCharacter = function(chardata, cb){
  character.model.create(chardata, function(err, newchar){
    if (err){cb(err)}
    else{
      game.model.find({nickname: newchar.game})
      .populate('_characters')
      .exec(function(err, game){
        if(err){console.log(err)}
        else{
          game = game[0];
          game._characters.push(newchar);
          game.save(cb);
        }
      });
    }
  });
};

var createFighter = function (data, cb) {
  var formatted = {
    _person: data.person,
    _characters: data.characters 
  };
  return fighter.model.create(formatted, cb);
};

var createMatch = function(data, cb){
  var formatted = {
    approved: data.approved,
    title: data.title,
    category: data.category,
    _casters: data.casters,
    _fighterOne: data.fighterOne,
    _fighterTwo: data.fighterTwo,
    _videos: data.videos,
    _teams: data.teams,
    _game: data.game,
    _event: data.event,
    _channel: data.channel
  };
  return match.model.create(formatted, cb);
};

var get = function (modelType, id, cb) {
  return modelType.findById(id, function (err, res) {
    return cb(err, formatDbResponse(res)); 
  });
};

var getMultiple = function (modelType, cb) {
  return modelType.find({}, function (err, res) {
    if (err) cb(err);
    else cb(err, map(res, formatDbResponse));
  });
};

var searchMatches = function(query, cb){
  match.model.find(query)
  .populate("_fighterOne")
  .populate("_fighterTwo")
  .populate("_videos")
  .populate("_teams")
  .populate("_event")
  .populate("_game")
  .populate("_channel")
  .populate("_casters")
  .exec(function (err, res) {
    match.model.populate(res, personOneOptions, function (err, matches) {
      match.model.populate(matches, charactersOneOptions, function (err, results) {
        match.model.populate(matches, personTwoOptions, function (err, results) {
          match.model.populate(matches, charactersTwoOptions, function (err, results) {
            if (err) cb(err); 
            else cb(null, map(results, formatNestedMatch));   
          });
        });
      });
    });
  });
}

//Read
var getPerson = partial(get, person.model);
var getCharacter = partial(get, character.model);
var getGame = partial(get, game.model);
var getVideo = partial(get, video.model);
var getEvent = partial(get, event.model);
var getChannel = partial(get, channel.model);
var getTeam = partial(get, team.model);
var getFighter = partial(get, fighter.model);
var getMatch = partial(get, match.model);
var getSubmittedMatch = partial(get, submittedMatch.model);

var getPeople = partial(getMultiple, person.model);
var getCharacters = partial(getMultiple, character.model);
var getGames = partial(getMultiple, game.model);
var getVideos = partial(getMultiple, video.model);
var getEvents = partial(getMultiple, event.model);
var getChannels = partial(getMultiple, channel.model);
var getTeams = partial(getMultiple, team.model);
var getFighters = partial(getMultiple, fighter.model);
var getMatches = partial(getMultiple, match.model);
var getSubmittedMatches = partial(getMultiple, submittedMatch.model);

//helpers for getMatchNested
var personOneOptions = {
  model: "Person",
  path: "_fighterOne._person"
};
var charactersOneOptions = {
  model: "Character",
  path: "_fighterOne._characters"
};

var personTwoOptions = {
  model: "Person",
  path: "_fighterTwo._person"
};
var charactersTwoOptions = {
  model: "Character",
  path: "_fighterTwo._characters"
};

var formatNestedFighter = function (monFighter) {
  if(monFighter){
    return {
      id: monFighter["_id"],
      characters: map(monFighter["_characters"], formatDbResponse),
      person: formatDbResponse(monFighter["_person"])
    };
  } else {
    return null;
  }
};

var formatNestedGame = function (monGame) {
  return {
    id: monGame["_id"],
    name: monGame.name,
    nickname: monGame.nickname,
    characters: map(monGame["_characters"], formatDbResponse)
  };
};

var formatNestedMatch = function (monMatch) {
  if(monMatch){
    return {
      id: monMatch["_id"],
      approved: monMatch.approved,
      featured: monMatch.featured,
      description: monMatch.description,
      title: monMatch.title,
      casters: map(monMatch["_casters"], formatDbResponse),
      fighterOne: formatNestedFighter(monMatch["_fighterOne"]),
      fighterTwo: formatNestedFighter(monMatch["_fighterTwo"]),
      videos: map(monMatch["_videos"], formatDbResponse),
      teams: map(monMatch["_teams"], formatDbResponse),
      event: formatDbResponse(monMatch["_event"]),
      game: formatDbResponse(monMatch["_game"]),
      channel: formatDbResponse(monMatch["_channel"]),
      category: monMatch.category,
      createdAt: monMatch.createdAt,
      updatedAt: monMatch.updatedAt
    };
  } else return {};
};

var getFighterNested = function (id, cb) {
  fighter.model.findById(id)
  .populate("_characters")
  .populate("_person")
  .exec(function (err, fighter) {
    if (err) cb(err);
    else cb(null, formatNestedFighter(fighter));
  });
};

var getMatchNested = function (id, cb) {
  match.model.findById(id)
  .populate("_fighterOne")
  .populate("_fighterTwo")
  .populate("_videos")
  .populate("_teams")
  .populate("_event")
  .populate("_game")
  .populate("_channel")
  .populate("_casters")
  .exec(function (err, res) {
    match.model.populate(res, personOneOptions, function (err, res) {
      match.model.populate(res, charactersOneOptions, function (err, res) {
        match.model.populate(res, personTwoOptions, function (err, res) {
          match.model.populate(res, charactersTwoOptions, function (err, res) {
            if (err) cb(err);
            else cb(null, formatNestedMatch(res));
          });
        });
      });
    });
  });
};

var getGameNested = function (id, cb) {
  game.model.findById(id)
  .populate("_characters")
  .exec(function (err, games) {
    if (err) cb(err);
    else cb(null, formatNestedGame(game)); 
  });
};

var getGamesNested = function (cb) {
  game.model.find()
  .populate("_characters")
  .exec(function (err, games) {
    if (err) cb(err); 
    else cb(null, map(games, formatNestedGame));
  })
};

var getFightersNested = function (cb) {
  fighter.model.find()
  .populate("_person")
  .populate("_characters")
  .exec(function (err, fighters) {
    if (err) cb(err);
    else cb(null, map(fighters, formatNestedFighter));
  });
};

var getMatchesNested = function (cb) {
  match.model.find()
  .populate("_fighterOne")
  .populate("_fighterTwo")
  .populate("_videos")
  .populate("_teams")
  .populate("_event")
  .populate("_game")
  .populate("_channel")
  .populate("_casters")
  .exec(function (err, res) {
    match.model.populate(res, personOneOptions, function (err, matches) {
      match.model.populate(matches, charactersOneOptions, function (err, results) {
        match.model.populate(matches, personTwoOptions, function (err, results) {
          match.model.populate(matches, charactersTwoOptions, function (err, results) {
            if (err) cb(err); 
            else cb(null, map(results, formatNestedMatch));
              // // console.log(results);
          });
        });
      });
    });
  });
};

var getAll = function (cb) {
  async.parallel({
    submittedMatches: getSubmittedMatches,
    people: getPeople,
    characters: getCharacters,
    games: getGames,
    videos: getVideos,
    events: getEvents,
    channels: getChannels,
    teams: getTeams,
    fighters: getFightersNested,
    matches: getMatchesNested
  }, cb);
};

//update
var updateMatchById = function(id, updateOptions, cb){
  match.model.findByIdAndUpdate(id, updateOptions, function(err, res){
    if (err) console.log(err);
    else cb(null, res);
  });
};

//delete
var deleteModelById = function (modelType, id, cb) {
  return modelType.findByIdAndRemove(id, function (err, res) {
    if (err) console.log(err);
    else cb(err, formatDbResponse(res)); 
  });
};

var deletePerson = partial(deleteModelById, person.model);
var deleteCharacter = partial(deleteModelById, character.model);
var deleteGame = partial(deleteModelById, game.model);
var deleteVideo = partial(deleteModelById, video.model);
var deleteEvent = partial(deleteModelById, event.model);
var deleteChannel = partial(deleteModelById, channel.model);
var deleteTeam = partial(deleteModelById, team.model);
var deleteFighter = partial(deleteModelById, fighter.model);
var deleteMatch = partial(deleteModelById, match.model);
var deleteSubmittedMatch = partial(deleteModelById, submittedMatch.model);


module.exports = {
  deleteGame: deleteGame,
  deletePerson: deletePerson,
  deleteVideo: deleteVideo,
  deleteEvent: deleteEvent,
  deleteChannel: deleteChannel,
  deleteTeam: deleteTeam,
  deleteFighter: deleteFighter,
  deleteMatch: deleteMatch,
  deleteCharacter: deleteCharacter,  
  deleteSubmittedMatch: deleteSubmittedMatch,
  updateMatchById: updateMatchById,
  createPerson: createPerson, 
  createCharacter: createCharacter,
  createGame: createGame,
  createEvent: createEvent,
  createVideo: createVideo,
  createChannel: createChannel,
  createTeam: createTeam,
  createFighter: createFighter,
  createMatch: createMatch,
  createSubmittedMatch: createSubmittedMatch,
  
  getAll: getAll,
  getPerson: getPerson, 
  getCharacter: getCharacter,
  getGame: getGame,
  getEvent: getEvent,
  getVideo: getVideo,
  getChannel: getChannel,
  getTeam: getTeam,
  getFighter: getFighter,
  getMatch: getMatch,
  getMatchNested: getMatchNested,
  getFighterNested: getFighterNested,
  getGameNested: getGameNested,
  getSubmittedMatch: getSubmittedMatch,
  
  getPeople: getPeople, 
  getCharacters: getCharacters,
  getGames: getGames,
  getEvents: getEvents,
  getVideos: getVideos,
  getChannels: getChannels,
  getTeams: getTeams,
  getFighters: getFighters,
  getMatches: getMatches,
  getMatchesNested: getMatchesNested,
  getFightersNested: getFightersNested,
  getGamesNested: getGamesNested,
  
  searchMatches: searchMatches
}
