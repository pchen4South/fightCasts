var async = require('async');
var _ = require('lodash');
var partial = _.partial;
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

var create = function (modelType, data, cb) {
  return modelType.create(data, cb);
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
  modelType.findById(id, cb);
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
  getPlayer: getPlayer, 
  getCharacter: getCharacter,
  getGame: getGame,
  getCaster: getCaster,
  getEvent: getEvent,
  getVideo: getVideo,
  getChannel: getChannel,
  getTeam: getTeam,
  getFighter: getFighter,
  getMatch: getMatch
}
