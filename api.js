var async = require('async');
var _ = require('lodash');
var partial = _.partial;
var partialRight = _.partialRight;
var map = _.map;
var player = require('./models/playerModel');
var character = require('./models/characterModel');
var game = require('./models/gameModel');
var caster = require('./models/casterModel');
var event = require('./models/eventModel');
var video = require('./models/videoModel');
var channel = require('./models/channelModel');
var team = require('./models/teamModel');
var fighter = require('./models/fighterModel');
var match = require('./models/matchModel');

var formatDbResponse = function (result) {
  if(result){
   var cleaned = result.toObject();
   cleaned.id = result._id;
   delete cleaned._id;
   delete cleaned.__v;
   return cleaned;
  }
};

var create = function (modelType, data, cb) {
  return modelType.create(data, function (err, res) {
    return cb(err, formatDbResponse(res)); 
  });
};

//create
var createPlayer = partial(create, player.model);
var createCharacter = partial(create, character.model);
var createGame = partial(create, game.model);
var createVideo = partial(create, video.model);
var createCaster = partial(create, caster.model);
var createEvent = partial(create, event.model);
var createChannel = partial(create, channel.model);
var createTeam = partial(create, team.model);

var createFighter = function (data, cb) {
  var formatted = {
    _player: data.player,
    _characters: data.characters 
  };

  return fighter.model.create(formatted, cb);
};

var createMatch = function(data, cb){
  var formatted = {
    _fighters: data.fighters,
    _casters: data.casters,
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
    var formatted = map(res, formatDbResponse);    
    return cb(err, formatted);
  });
};

//Read
var getPlayer = partial(get, player.model);
var getCharacter = partial(get, character.model);
var getGame = partial(get, game.model);
var getVideo = partial(get, video.model);
var getCaster = partial(get, caster.model);
var getEvent = partial(get, event.model);
var getChannel = partial(get, channel.model);
var getTeam = partial(get, team.model);
var getFighter = partial(get, fighter.model);
var getMatch = partial(get, match.model);

var getPlayers = partial(getMultiple, player.model);
var getCharacters = partial(getMultiple, character.model);
var getGames = partial(getMultiple, game.model);
var getVideos = partial(getMultiple, video.model);
var getCasters = partial(getMultiple, caster.model);
var getEvents = partial(getMultiple, event.model);
var getChannels = partial(getMultiple, channel.model);
var getTeams = partial(getMultiple, team.model);
var getFighters = partial(getMultiple, fighter.model);
var getMatches = partial(getMultiple, match.model);

//helpers for getMatchNested
var playerOptions = {
  model: "Player",
  path: "_fighters._player"
};
var charactersOptions = {
  model: "Character",
  path: "_fighters._characters"
};

var formatNestedFighter = function (monFighter) {
  return {
    id: monFighter["_id"],
    characters: map(monFighter["_characters"], formatDbResponse),
    player: formatDbResponse(monFighter["_player"])
  };
};

var formatNestedMatch = function (monMatch) {
  return {
    id: monMatch["_id"],
    fighters: map(monMatch["_fighters"], formatNestedFighter),
    casters: map(monMatch["_casters"], formatDbResponse),
    videos: map(monMatch["_videos"], formatDbResponse),
    teams: map(monMatch["_teams"], formatDbResponse),
    event: formatDbResponse(monMatch["_event"]),
    game: formatDbResponse(monMatch["_game"]),
    channel: formatDbResponse(monMatch["_channel"]),
  };
};

var getFighterNested = function (id, cb) {
  fighter.model.findById(id)
  .populate("_player")
  .populate("_characters")
  .exec(function (err, fighter) {
    if (err) cb(err);
    else cb(null, formatNestedFighter(fighter));
  });
};

var getMatchNested = function (id, cb) {
  match.model.findById(id)
  .populate("_fighters")
  .populate("_casters")
  .populate("_videos")
  .populate("_teams")
  .populate("_event")
  .populate("_game")
  .populate("_channel")
  .exec(function (err, res) {
    match.model.populate(res, playerOptions, function (err, res) {
      match.model.populate(res, charactersOptions, function (err, res) {
        if (err) cb(err);
        else cb(null, formatNestedMatch(res)); 
      });
    });
  });
};

var getFightersNested = function (cb) {
  fighter.model.find()
  .populate("_player")
  .populate("_characters")
  .exec(function (err, fighters) {
    if (err) cb(err);
    else cb(null, map(fighters, formatNestedFighter));
  });
};

var getMatchesNested = function (cb) {
  match.model.find()
  .populate("_fighters")
  .populate("_player")
  .populate("_characters")
  .populate("_casters")
  .populate("_videos")
  .populate("_teams")
  .populate("_event")
  .populate("_game")
  .populate("_channel")
  .exec(function (err, res) {
    match.model.populate(res, playerOptions, function (err, matches) {
      match.model.populate(matches, charactersOptions, function (err, results) {
        if (err) cb(err); 
        else cb(null, map(results, formatNestedMatch));
      });
    });
  });
};

var getAll = function (cb) {
  async.parallel({
    players: getPlayers,
    characters: getCharacters,
    games: getGames,
    videos: getVideos,
    casters: getCasters,
    events: getEvents,
    channels: getChannels,
    teams: getTeams,
    fighters: getFightersNested,
    matches: getMatchesNested
  }, cb);
};

module.exports = {
  createPlayer: createPlayer, 
  createCharacter: createCharacter,
  createGame: createGame,
  createCaster: createCaster,
  createEvent: createEvent,
  createVideo: createVideo,
  createChannel: createChannel,
  createTeam: createTeam,
  createFighter: createFighter,
  createMatch: createMatch,

  getAll: getAll,
  getPlayer: getPlayer, 
  getCharacter: getCharacter,
  getGame: getGame,
  getCaster: getCaster,
  getEvent: getEvent,
  getVideo: getVideo,
  getChannel: getChannel,
  getTeam: getTeam,
  getFighter: getFighter,
  getMatch: getMatch,
  getMatchNested: getMatchNested,
  getFighterNested: getFighterNested,

  getPlayers: getPlayers, 
  getCharacters: getCharacters,
  getGames: getGames,
  getCasters: getCasters,
  getEvents: getEvents,
  getVideos: getVideos,
  getChannels: getChannels,
  getTeams: getTeams,
  getFighters: getFighters,
  getMatches: getMatches,
  getMatchesNested: getMatchesNested,
  getFightersNested: getFightersNested,
}
