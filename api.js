var async = require('async');
var _ = require('lodash');
var forEach = _.forEach;
var keys = _.keys;
var partial = _.partial;
var map = _.map;
var person = require('./models/personModel');
var event = require('./models/eventModel');
var video = require('./models/videoModel');
var channel = require('./models/channelModel');
var team = require('./models/teamModel');
var fighter = require('./models/fighterModel');
var match = require('./models/matchModel');
var submittedMatch = require('./models/submittedMatchModel');
var featuredMatch = require('./models/featuredMatchModel');
var gamesList = require('./models/gameCharacterData');

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
var createVideo = partial(create, video.model);
var createEvent = partial(create, event.model);
var createChannel = partial(create, channel.model);
var createTeam = partial(create, team.model);
var createSubmittedMatch = partial(create, submittedMatch.model);
var createFeaturedMatch = partial(create, featuredMatch.model);

var createFighter = function (data, cb) {
  var formatted = {
    _person: data.person,
    characters: data.characters 
  };
  return fighter.model.create(formatted, cb);
};

var createMatch = function(data, cb){
  var dateString = data.playedAt.split("/");
  var jsDate = new Date(dateString[2], dateString[0] - 1, dateString[1]);

  var formatted = {
    approved: data.approved,
    title: data.title,
    category: data.category,
    description: data.description,
    playedAt: jsDate,
    _casters: data.casters,
    _fighterOne: data.fighterOne,
    _fighterTwo: data.fighterTwo,
    _videos: data.videos,
    _teams: data.teams,
    game: data.game,
    _event: data.event,
    _channel: data.channel
  };
  return match.model.create(formatted, cb);
};

var createFeaturedMatch = function (data, cb) {
  var formatted = {
    _match: data.match,
    game: data.game,
    category: data.category
  };
  return featuredMatch.model.create(formatted, cb);
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

//Read

var getFeaturedMatch = function (params, cb) {
  featuredMatch.model.findOne(params, {}, {sort: {"createdAt": -1}}, function (err, featuredMatch) {
    if (err) return cb(err); 
    else if (!featuredMatch) return cb(null, {});
    else getMatchNested(featuredMatch._match, cb);
  });
}

var getPerson = partial(get, person.model);
var getVideo = partial(get, video.model);
var getEvent = partial(get, event.model);
var getChannel = partial(get, channel.model);
var getTeam = partial(get, team.model);
var getFighter = partial(get, fighter.model);
var getMatch = partial(get, match.model);
var getSubmittedMatch = partial(get, submittedMatch.model);

var getPeople = partial(getMultiple, person.model);
var getVideos = partial(getMultiple, video.model);
var getEvents = partial(getMultiple, event.model);
var getChannels = partial(getMultiple, channel.model);
var getTeams = partial(getMultiple, team.model);
var getFighters = partial(getMultiple, fighter.model);
var getMatches = partial(getMultiple, match.model);
var getSubmittedMatches = partial(getMultiple, submittedMatch.model);
var getFeaturedMatches = partial(getMultiple, featuredMatch.model);

//helpers for getMatchNested
var personOneOptions = {
  model: "Person",
  path: "_fighterOne._person"
};

var personTwoOptions = {
  model: "Person",
  path: "_fighterTwo._person"
};

var formatNestedFighter = function (monFighter) {
  if(monFighter){
    return {
      id: monFighter["_id"],
      characters: monFighter["characters"],
      person: formatDbResponse(monFighter["_person"])
    };
  } else {
    return null;
  }
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
      game: monMatch.game,
      channel: formatDbResponse(monMatch["_channel"]),
      category: monMatch.category,
      createdAt: monMatch.createdAt,
      updatedAt: monMatch.updatedAt,
      playedAt: monMatch.playedAt
    };
  } else return {};
};

var getFighterNested = function (id, cb) {
  fighter.model.findById(id)
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
  .populate("_channel")
  .populate("_casters")
  .exec(function (err, res) {
    match.model.populate(res, personOneOptions, function (err, res) {
      match.model.populate(res, personTwoOptions, function (err, res) {
          if (err) cb(err);
          else cb(null, formatNestedMatch(res));
      });
    });
  });
};

var getFightersNested = function (cb) {
  fighter.model.find()
  .populate("_person")
  .exec(function (err, fighters) {
    if (err) cb(err);
    else cb(null, map(fighters, formatNestedFighter));
  });
};

var getMatchesNested = function (query, cb) {
  
  if (typeof query === typeof(Function)){
    cb = query;
    query = {};
  }
  
  match.model.find(query)
  .populate("_fighterOne")
  .populate("_fighterTwo")
  .populate("_videos")
  .populate("_teams")
  .populate("_event")
  .populate("_channel")
  .populate("_casters")
  .exec(function (err, res) {
    match.model.populate(res, personOneOptions, function (err, matches) {
      match.model.populate(matches, personTwoOptions, function (err, results) {
          if (err) cb(err); 
          else cb(null, map(results, formatNestedMatch));
            // // console.log(results);
      });
    });
  });
};

var getAll = function (cb) {
  async.parallel({
    submittedMatches: getSubmittedMatches,
    people: getPeople,
    videos: getVideos,
    events: getEvents,
    channels: getChannels,
    teams: getTeams,
    fighters: getFightersNested,
    matches: getMatchesNested,
    featuredMatches: getFeaturedMatches
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
var deleteVideo = partial(deleteModelById, video.model);
var deleteEvent = partial(deleteModelById, event.model);
var deleteChannel = partial(deleteModelById, channel.model);
var deleteTeam = partial(deleteModelById, team.model);
var deleteFighter = partial(deleteModelById, fighter.model);
var deleteMatch = partial(deleteModelById, match.model);
var deleteSubmittedMatch = partial(deleteModelById, submittedMatch.model);


module.exports = {
  deletePerson: deletePerson,
  deleteVideo: deleteVideo,
  deleteEvent: deleteEvent,
  deleteChannel: deleteChannel,
  deleteTeam: deleteTeam,
  deleteFighter: deleteFighter,
  deleteMatch: deleteMatch,
  deleteSubmittedMatch: deleteSubmittedMatch,
  updateMatchById: updateMatchById,
  createPerson: createPerson, 
  createEvent: createEvent,
  createVideo: createVideo,
  createChannel: createChannel,
  createTeam: createTeam,
  createFighter: createFighter,
  createMatch: createMatch,
  createSubmittedMatch: createSubmittedMatch,
  createFeaturedMatch: createFeaturedMatch,
  
  getAll: getAll,
  getPerson: getPerson, 
  getEvent: getEvent,
  getVideo: getVideo,
  getChannel: getChannel,
  getTeam: getTeam,
  getFighter: getFighter,
  getMatch: getMatch,
  getMatchNested: getMatchNested,
  getFighterNested: getFighterNested,
  getSubmittedMatch: getSubmittedMatch,
  
  getPeople: getPeople, 
  getEvents: getEvents,
  getVideos: getVideos,
  getChannels: getChannels,
  getTeams: getTeams,
  getFighters: getFighters,
  getMatches: getMatches,
  getFeaturedMatches: getFeaturedMatches,
  getMatchesNested: getMatchesNested,
  getFightersNested: getFightersNested,

  getFeaturedMatch: getFeaturedMatch
}
