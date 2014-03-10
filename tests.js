var api = require('./api')
  , _ = require('lodash')
  , map = _.map

api.getGamesNested(function (err, res) {
  console.log(err);
  console.log("wut");
  console.log(JSON.stringify(res, null, 4));
});
