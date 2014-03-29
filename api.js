var async = require('async');
var _ = require('lodash');
var partial = _.partial;
var map = _.map;
var person = require('./models/personModel');
var event = require('./models/eventModel');
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
var createEvent = partial(create, event.model);
var createSubmittedMatch = partial(create, submittedMatch.model);
var createFeaturedMatch = partial(create, featuredMatch.model);

var createMatch = function(data, cb){
  var dateString = data.playedAt.split("/");
  var jsDate = new Date(dateString[2], dateString[0] - 1, dateString[1]);

  var formatted = {
    approved: data.approved,
    title: data.title,
    category: data.category,
    description: data.description,
    playedAt: jsDate,
    game: data.game,
    _casters: data.casters,
    _event: data.event,
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
var getEvent = partial(get, event.model);
var getMatch = partial(get, match.model);
var getSubmittedMatch = partial(get, submittedMatch.model);

var getPeople = partial(getMultiple, person.model);
var getEvents = partial(getMultiple, event.model);
var getMatches = partial(getMultiple, match.model);
var getSubmittedMatches = partial(getMultiple, submittedMatch.model);
var getFeaturedMatches = partial(getMultiple, featuredMatch.model);

var formatNestedMatch = function (monMatch) {
  if (monMatch) {
    return {
      id: monMatch["_id"],
      description: monMatch.description,
      title: monMatch.title,
      casters: map(monMatch["_casters"], formatDbResponse),
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

var getMatchNested = function (id, cb) {
  match.model.findById(id)
  .populate("_event")
  .populate("_casters")
  .exec(function (err, res) {
    if (err) cb(err);
    else cb(null, formatNestedMatch(res));
  });
};

var getMatchesNested = function (query, cb) {
  
  if (typeof query === typeof(Function)){
    cb = query;
    query = {};
  }
  
  match.model.find(query)
  .populate("_event")
  .populate("_casters")
  .exec(function (err, res) {
    if (err) cb(err); 
    else cb(null, map(res, formatNestedMatch));
  });
};

var getAll = function (cb) {
  async.parallel({
    submittedMatches: getSubmittedMatches,
    people: getPeople,
    events: getEvents,
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
var deleteEvent = partial(deleteModelById, event.model);
var deleteMatch = partial(deleteModelById, match.model);
var deleteSubmittedMatch = partial(deleteModelById, submittedMatch.model);

module.exports = {
  deletePerson: deletePerson,
  deleteEvent: deleteEvent,
  deleteMatch: deleteMatch,
  deleteSubmittedMatch: deleteSubmittedMatch,

  updateMatchById: updateMatchById,

  createPerson: createPerson, 
  createEvent: createEvent,
  createMatch: createMatch,
  createSubmittedMatch: createSubmittedMatch,
  createFeaturedMatch: createFeaturedMatch,
  
  getAll: getAll,
  getPerson: getPerson, 
  getEvent: getEvent,
  getMatch: getMatch,
  getMatchNested: getMatchNested,
  getSubmittedMatch: getSubmittedMatch,
  
  getPeople: getPeople, 
  getEvents: getEvents,
  getMatches: getMatches,
  getFeaturedMatches: getFeaturedMatches,
  getMatchesNested: getMatchesNested,

  getFeaturedMatch: getFeaturedMatch
}
