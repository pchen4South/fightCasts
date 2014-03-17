var _ = require('lodash');
var find = _.find;
var first = _.first;
var api = require('../api');

//remove when ready
var createPayload = function (matches) {

  var matchesByCategory = sortByCategory(matches);
  
  
  matchesByCategory.pro.sort(sortByDateMostRecent);
  matchesByCategory.scrub.sort(sortByDateMostRecent);
  matchesByCategory.community.sort(sortByDateMostRecent);
  
  return {
    matches: matchesByCategory,
    featuredMatches: {
      pro: matchesByCategory.pro[0], 
      community: matchesByCategory.community[1], 
      scrub: matchesByCategory.scrub[0], 
      topRated: matchesByCategory.pro[1], 
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


module.exports = function (app) {
  var returnIndex = function (req, res) {
    api.getMatchesNested(function (err, matches) {
      var payload = createPayload(matches);
      console.log(JSON.stringify(payload, null, 6));
      res.render("index", payload); 
     });
  };

  app.get("/test", function (req, res) {
    res.render("test");
  });
  app.get("/", returnIndex);
  app.get("/matches", returnIndex);
  app.get("/matches/submit", function (req, res) {
    api.getAll(function (err, results) {
      res.render("submitForm", results); 
    });
  });
  app.get('/matches/:id', function (req, res) {
    var id = req.params.id;
    
    api.getMatchNested(id, function (err, match) {
      console.log("MATCH: ", match);
      res.render("match", match); 
    });
  });
};
