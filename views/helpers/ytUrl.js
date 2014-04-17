var _ = require('lodash');
var rest = _.rest;
var first = _.first;
var pluck = _.pluck;
var prefix = "//www.youtube.com/embed/";

module.exports = function (videos) {
  if(videos){
    return (videos.length > 0) 
      ? prefix + first(videos) + "?playlist=" + rest(videos, 1).join()
      : "";
  } else return "";
}
