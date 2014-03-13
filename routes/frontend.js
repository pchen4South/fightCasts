var _ = require('lodash');
var find = _.find;
var api = require('../api');

module.exports = function (app) {
  var returnIndex = function (req, res) {
    api.getMatchesNested(function (err, matches) {
      //res.render("index", {matches: [1,2,3,4,5,6]});
      console.log(matches);
      res.render("index", {matches: matches}); 
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
