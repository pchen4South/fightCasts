var moment = require("moment");

var log = function (text) {
  var timeStamp = moment().format("MMMM Do YYYY, h:mm:ss a");

  console.log(text + " " + timeStamp); 
};

var error = function (text) {
  var timeStamp = moment().format("MMMM Do YYYY, h:mm:ss a");

  console.error(text + " " + timeStamp); 
}

module.exports = {
  log: log,
  error: error
};
