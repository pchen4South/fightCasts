var searchApi = require("./services/search/search");
var api = require("./api");
var mongoose = require("mongoose");
var mongoUri = require('./config.json').services.db.uri;

mongoose.connect(mongoUri);
//here we test our es api for basic fuzzy searching
searchApi.getMatchIdsForQuery("ryu", function (err, ids) {
  var query = {
    _id: {
      $in: ids
    } 
  };
  api.getMatchesNested(query, function (err, matches) {
    console.log(err);
    console.log(matches); 
    mongoose.disconnect();
  });
});
