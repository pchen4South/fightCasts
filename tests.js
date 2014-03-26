var api = require('./api')
  , _ = require('lodash')
  , map = _.map

api.getFeaturedMatch(function (err, res) {
  console.log("test");
  console.log(err);
  console.log(res);
});
