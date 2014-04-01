var api = require('../api');
var _ = require('lodash');
var find = _.find;
var first = _.first;
var partial = _.partial;
var filter = _.filter;

module.exports = function (app) {

  app.post("/api/v1/people", api.createPerson);
  app.post("/api/v1/events", api.createEvent);
  app.post("/api/v1/matches", api.createMatch);

  //MATCH
  app.get("/api/v1/matches/", function (req, res, next) {
    var query = req.query.search;
    var querystring = query;
    query = {"title": {"$regex": new RegExp(query, "i")}};
 
    api.getMatchesNested(query, function (err, results) {
      if (err) res.send(400, {err: err.message});
      else {
        res.render("results",{matches: results, query: querystring}); 
      }
    }); 
  });
};
