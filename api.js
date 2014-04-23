var querystring = require('querystring');
var async = require('async');
var through = require('through');
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');
var isFunction = _.isFunction;
var partial = _.partial;
var map = _.map;
var forEach = _.forEach;
var find = _.find;
var findKey = _.findKey;
var personModel = require('./models/personModel').model;
var eventModel = require('./models/eventModel').model;
var matchModel = require('./models/matchModel').model;
var userModel = require('./models/userModel').model;
var gamesList = require('./models/gameCharacterData');
var generateTempPw = function () {
  return Math.random().toString(36).slice(-8);
};

//helper to extract id from full youtube urls
var extractVideoId = function (video) {
  var videoUrl = video.url;
  var queries = videoUrl.split("?")[1];
  return queries ? querystring.parse(queries)["v"] : videoUrl;
};

//helper to ensure passwords and tempPws are not returned
var cleanUser = function (user) {
  if (!user) return null;
  return {
    email: user.email,
    _id: user._id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt 
  }
};

//create

/*
 * when creating a user, we first check that there is a valid email and pw
 * check if a user with this email already exists
 * we then encrypt the password and store 
*/
var createUser = function (userData, cb) {
  if (!userData.email) return (cb(new Error("Must provide valid email.")));
  if (!userData.password) return (cb(new Error("Must provide valid password.")));

  var SALT_WORK_FACTOR = 10;

  userModel.findOne({email: userData.email}, function (err, existingUser) {
    if (err) return cb(err); 
    if (existingUser) return cb(new Error("That email is already registered")); 

    bcrypt.hash(userData.password, SALT_WORK_FACTOR, function (err, hashedPw) {
      if (err) return cb(err);

      var user = {
        email: userData.email,
        password: hashedPw
      };

      userModel.create(user, function (err, newUser) {
        cb(err, cleanUser(newUser));  
      });
    });
  });
};

/*
 * check if this user's password matches the encrypted one stored
 * if it doesn't, return error
 * if it does, hash the new password and then update the model in the db
*/
var changeUserPassword = function (userData, newPass, cb) {
  if (!userData.email) return cb(new Error("Must provide email"));
  if (!userData.password) return cb(new Error("Must provide password"));

  var SALT_WORK_FACTOR = 10;

  userModel.findOne({email: userData.email})
  .lean()
  .exec(function (err, user) {
    if (err) return cb(err); 
    if (!user) return cb(new Error("No user found for that email"));

    async.parallel({
      passwordMatch: partial(bcrypt.compare, userData.password, user.password),
      tempMatch: partial(bcrypt.compare, userData.password, user.tempPw)
    }, function (err, results) {
      if (err) return cb(err);

      var validTempMatch = !!user.tempPw && (results.tempMatch === true);
      var validPwMatch = results.passwordMatch

      if (!(validPwMatch || validTempMatch)) {
        return cb(new Error("Provided password does not match"));
      }

      bcrypt.hash(newPass, SALT_WORK_FACTOR, function (err, hashedPw) {
        if (err) return cb(err); 

        var updatedUser = {
          password: hashedPw,
          tempPw: ""
        };

        userModel.findOneAndUpdate({email: userData.email}, updatedUser, function (err, user) {
          if (err) return cb(err); 
          if (!user) return cb(new Error("Something went wrong in the update"));

          cb(err, cleanUser(user));
        });
      });
    });
  }); 
};

var resetUserPassword = function (email, cb) {
  if (!email) return cb(new Error("Must provide email"));
  var query = {
    email: email 
  };

  userModel.findOne(query)
  .lean()
  .exec(function (err, user) {
    if (err) return cb(err);  
    if (!user) return cb(new Error("No user found for that email"));

    var tempPw = generateTempPw();
    var SALT_WORK_FACTOR = 10;
    var changes = {
      tempPw: hashedPw 
    };

    bcrypt.hash(tempPw, SALT_WORK_FACTOR, function (err, hashedPw) {
      userModel.findOneAndUpdate(query, changes, function (err, updatedUser) {
        cb(err, tempPw); 
      })
    });
  });
};

//verifies that provided email and password are for a valid user
var verifyUser = function (userData, cb) {
  if (!userData.email) return cb(new Error("Must provide email"));
  if (!userData.password) return cb(new Error("Must provide password"));

  var SALT_WORK_FACTOR = 10;

  userModel.findOne({email: userData.email})
  .lean()
  .exec(function (err, user) {
    if (err) return cb(err); 
    if (!user) return cb(new Error("No user found for that email"));

    async.parallel({
      passwordMatch: partial(bcrypt.compare, userData.password, user.password),
      tempMatch: partial(bcrypt.compare, userData.password, user.tempPw)
    }, function (err, results) {
      if (err) return cb(err);
      if (results.passwordMatch === false && results.tempMatch === false) {
        return cb(new Error("Provided password does not match"));
      }
      cb(err, cleanUser(user)); 
    });
  });
};

var createPerson = function (personData, cb) {
  var person = {
    name: personData.name 
  };

  personModel.create(person, cb);
};

var createEvent = function (eventData, cb) {
  var event = {
    name: eventData.name,
    country: eventData.country,
    startDate: eventData.startDate,
    endDate: eventData.endDate
  };

  eventModel.create(event, cb);
};

var createMatch = function (matchData, cb) {
  var match = {
    game: "1",
    title: matchData.title,
    description: matchData.description,
    category: matchData.category,
    playedAt: matchData.playedAt,
    videos: map(matchData.videos, extractVideoId),
    fighters: matchData.fighters,
    casters: matchData.casters,
    event: matchData.event,
  };
  matchModel.create(match, cb);
};

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

var getUser = function (id, cb) {
  userModel.findById(id, function (err, user) {
    cb(err, cleanUser(user));
  });
};

var getUserByEmail = function (email, cb) {
  userModel.findOne({email: email})
  .lean()
  .exec(function (err, user) {
    if (err) return cb(err); 
    if (!user) return cb(err, {});

    return cb(err, cleanUser(user));
  });
};

//we make this async intentionally such that it can be changed in future
var getGame = function (id, cb) {
  var game;
  var err;

  try {
    game = gamesList[id]; 
  } catch (e) {
    err = e; 
  }
  process.nextTick(function () {
    cb(err, game); 
  });
};

//here we lookup a match for our slug then return the object
var getGameBySlug = function (slug, cb) {
  var game;
  var err;

  try {
    game = gamesList[findKey(gamesList, {slug: slug})]; 
  } catch (e) {
    err = e; 
  }
  process.nextTick(function () {
    cb(err, game); 
  });
};

var getGameIdBySlug = function (slug, cb) {
  var id;
  var err;

  try {
    id = findKey(gamesList, {slug: slug}); 
  } catch (e) {
    err = e; 
  }
  process.nextTick(function () {
    cb(err, id); 
  });
};

var getPeople = partial(getMultiple, personModel);
var getEvents = partial(getMultiple, eventModel);
var getMatches = partial(getMultiple, matchModel);

//TODO: support queries?
var getUsers = function (cb) {
  userModel.find()
  .lean()
  .exec(function (err, users) {
    cb(err, map(users, cleanUser)); 
  });
};

//mutative, populates characters for a match's fighters 
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

var getMatchesNested = function (query, cb) {
  if (isFunction(query)) cb = query;

  matchModel.find(query)
  .lean()
  .sort("createdAt")
  .populate("event casters fighters.person")
  .exec(function (err, matches) {
    if (err) return cb(err);
    if (!matches) {
      return cb(null, []);
    }
    forEach(matches, populateCharacters);
    forEach(matches, populateGame);
    cb(null, matches);
  });
};

//Returns stream of nested populated matches
var getMatchesNestedStream = function (query) {
  var populateStream = through(function (match) {
    populateCharacters(match);
    populateGame(match);
    this.queue(match);
  });

  matchModel.find(query)
  .lean()
  .sort("createdAt")
  .populate("event casters fighters.person")
  .stream()
  .pipe(populateStream);

  return populateStream;
};

var getMatchNested = function (id, cb) {
  if (!id) return cb(null, null);

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
  matchModel.findOne({category: "pro", game: "1"})
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
  matchModel.findOne({category: "community", game: "1"})
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
  async.series({
    people: getPeople,
    events: getEvents,
    matches: getMatchesNested
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
var deleteUser = partial(deleteModelById, userModel);

module.exports.deletePerson = deletePerson;
module.exports.deleteEvent = deleteEvent;
module.exports.deleteMatch = deleteMatch;
module.exports.deleteUser = deleteUser;

module.exports.updateMatchById = updateMatchById;
module.exports.featureMatch = featureMatch;
module.exports.changeUserPassword = changeUserPassword;
module.exports.resetUserPassword = resetUserPassword;
module.exports.verifyUser = verifyUser;

module.exports.createPerson = createPerson; 
module.exports.createEvent = createEvent;
module.exports.createMatch = createMatch;
module.exports.createUser = createUser;

module.exports.getUser = getUser;
module.exports.getPerson = getPerson; 
module.exports.getEvent = getEvent;
module.exports.getMatch = getMatch;
module.exports.getMatchNested = getMatchNested;
module.exports.getFeaturedProMatch = getFeaturedProMatch;
module.exports.getFeaturedCommunityMatch = getFeaturedCommunityMatch;
module.exports.getGame = getGame;
module.exports.getGameBySlug = getGameBySlug;
module.exports.getGameIdBySlug = getGameIdBySlug;

module.exports.getUsers = getUsers;
module.exports.getPeople = getPeople; 
module.exports.getEvents = getEvents;
module.exports.getMatches = getMatches;
module.exports.getMatchesNested = getMatchesNested;
module.exports.getMatchesNestedStream = getMatchesNestedStream;
module.exports.getAll = getAll;
