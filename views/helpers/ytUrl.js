var _ = require('lodash');
var rest = _.rest;
var first = _.first;
var pluck = _.pluck;
var prefix = "//www.youtube.com/embed/";

module.exports = function (videos) {
  var ids = pluck(videos, "url");

  return (videos.length > 0) 
    ? prefix + first(ids) + "?playlist=" + rest(ids, 1).join()
    : "";
}
