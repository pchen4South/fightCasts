var api = require('../api');
var _ = require('lodash');
var find = _.find;
var first = _.first;
var partial = _.partial;
var filter = _.filter;

module.exports = function (app) {

  //PLAYER
  app.post("/api/v1/people", api.createPerson);

  // //CHARACTER
  // app.post("/api/v1/characters", api.createCharacter);
  // app.get("/api/v1/characters", function (req, res) {
    // api.getCharacters(function (err, characters) {
      // if (err) res.send(400, {err: err.message});
      // else res.json(characters); 
    // }); 
  // });

  // //GAME
  // app.post("/api/v1/games", api.createGame);
  // app.get("/api/v1/games", function (req, res) {
    // api.getGamesNested(function (err, games) {
      // if (err) res.send(400, {err: err.message});
      // else res.json(games); 
    // }); 
  // });

  //VIDEO
  app.post("/api/v1/videos", api.createVideo);

  //EVENT
  app.post("/api/v1/events", api.createEvent);

  //CHANNEL
  app.post("/api/v1/channels", api.createChannel);

  //TEAM
  app.post("/api/v1/teams", api.createTeam);

  //FIGHTER
  
  //MATCH
  app.get("/api/v1/matches/", function (req, res, next) {
    var query = req.query.search;
    var querystring = query;
    query = {"title": {"$regex": new RegExp(query, "i")}};
 
    api.getMatchesNested(query,function (err, results) {
      if (err) res.send(400, {err: err.message});
      else {
        res.render("results",{matches: results, query: querystring}); 
      }
    }); 
  });
  
  app.get("/api/v1/matches/all", allMatches);
  app.get("/api/v1/matches/pro", partial(getMatchByCategory, "pro"));
  app.get("/api/v1/matches/community", partial(getMatchByCategory, "community"));
  app.get("/api/v1/matches/scrub", partial(getMatchByCategory, "scrub"));
  
  app.post("/api/v1/submittedMatches", function (req, res) {
    api.createSubmittedMatch({matchJson: req.body}, function (err, result) {
      if (err) res.send(400, {err: err.message}); 
      else res.json(result);
    });
  });
};



//HELPERS
var createPayload = function (matches) {

  var matchesByCategory = sortByCategory(matches);
  
  matchesByCategory.pro.sort(sortByDateMostRecent);
  matchesByCategory.scrub.sort(sortByDateMostRecent);
  matchesByCategory.community.sort(sortByDateMostRecent);

  return {
    matches: matchesByCategory,
    featuredMatches: {
      pro: getFeaturedMatches(matchesByCategory.pro)[0] || {}, 
      community: getFeaturedMatches(matchesByCategory.community)[0] || {}, 
      scrub: getFeaturedMatches(matchesByCategory.scrub)[0] || {}, 
      //default: matchesByCategory.pro[0], 
    },
    communityMatches: first(matchesByCategory.community, 3)
  };
};

var sortByCategory = function (matchArray){
  var community = [];
  var pro = [];
  var scrub = [];
  
  for(var i = 0; i < matchArray.length; ++i){
    switch(matchArray[i].category){
      case "pro":
        pro.push(matchArray[i]);
        break;
      case "scrub":
        scrub.push(matchArray[i]);
        break;
      case "community":
        community.push(matchArray[i]);
        break;
    }
  }
  
  return {pro: pro, community: community, scrub:scrub};  
  
};

var sortByDateMostRecent = function(date1,date2){
  return date1 - date2;
};

var allMatches = function (req, res) {
  api.getMatchesNested(function (err, matches) {
    var payload = createPayload(matches);
    //console.log(JSON.stringify(payload, null, 6));
    res.send(payload);
   });
};

var getMatchByCategory = function (type, req, res) {
  api.getMatchesNested(function (err, matches) {
    var payload = filter(matches, function(element){
      return element.category == type;
    });
    res.send(payload);
   });
};

var getFeaturedMatches = function(matchArray){
  var featured = filter(matchArray, function(element){
    return element.featured == true;
  });
  return featured;
};
