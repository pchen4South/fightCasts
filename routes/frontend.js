var _ = require('lodash');
var async = require('async');
var find = _.find;
var first = _.first;
var api = require('../api');
var filter = _.filter;

var gameFilter = {default: 'SF4'};

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
      default: matchesByCategory.pro[0], 
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

var getFeaturedMatches = function(matchArray){
  var featured = filter(matchArray, function(element){
    return element.featured == true;
  });
  if (featured) return featured;
  else return [{}];
};


module.exports = function (app) {
  //var returnIndex = function (req, res) {
  //  api.getMatchesNested(function (err, matches) {
  //    var payload = createPayload(matches);
  //    res.render("index", payload); 
  //   });

  //};

  var returnIndex = function (req, res) {
    var query = req.query;
    if (!_.isEmpty(query)){query = parseQuery(query)};
  
    async.parallel({
      matches: async.apply(api.getMatchesNested, query),
      featured: api.getFeaturedMatch 
    }, function (err, results) {
      //build payload.  replace the line below
      var payload = createPayload(results.matches, results.featured);

      res.render("index", payload);
    });
  };
  
  
  var parseQuery = function(query){
    var searchString = query.search;
    var gameString = query.game;
    
    if(!gameString){gameString = "SF4"}
    return {title: {"$regex": new RegExp(searchString, "i")}};
  };

  app.get("/", returnIndex);
  app.get("/matches", returnIndex);
  app.get('/matches/:id', function (req, res) {
    var id = req.params.id;
    
    api.getMatchNested(id, function (err, match) {
      res.render("match", match); 
    });
  });
};

