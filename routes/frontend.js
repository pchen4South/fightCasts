var _ = require('lodash');
var find = _.find;
var api = require('../api');

module.exports = function (app) {
  var returnIndex = function (req, res) {
    api.getMatches(function (err, matches) {
      res.render("index", {matches: matches}); 
    });
  };

  app.get("/", returnIndex);
  app.get("/matches", returnIndex);
  app.get('/matches/:id', function (req, res) {
    var id = Number(req.params.id)

    api.getMatch(id, function (err, match) {
      res.render("match", match); 
    });
  });
};
