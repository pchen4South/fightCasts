var _ = require('lodash');
var find = _.find;
var api = require('../api');

var createPayload = function (matches) {
  return {
    matches: matches,
    featuredMatches: {
      pro: matches[0], 
      community: matches[1], 
      scrub: matches[1], 
    } 
  };
};

module.exports = function (app) {
  var returnIndex = function (req, res) {
    api.getMatchesNested(function (err, matches) {
      var payload = createPayload(matches);
      console.log(payload);
      res.render("index", payload); 
    });
  };

  app.get("/", returnIndex);
  app.get("/matches", returnIndex);
  app.get("/matches/submit", function (req, res) {
    api.getAll(function (err, results) {
      res.render("submitForm", results); 
    });
  });
  app.get('/matches/:id', function (req, res) {
    var id = req.params.id

    api.getMatchNested(id, function (err, match) {
      res.render("match", match); 
    });
  });
};
