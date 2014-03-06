var _ = require('lodash');
var find = _.find;
var matches = require('../databaseScripts/matches');

module.exports = function (app) {
  var returnIndex = function (req, res) {
    res.render("index", {matches: matches});
  };

  app.get("/", returnIndex);
  app.get("/matches", returnIndex);
  app.get('/matches/:id', function (req, res) {
    var id = Number(req.params.id)
      , match = find(matches, {id: id});

    res.render("match", match);
  });
};
