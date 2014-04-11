var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var creds = require('../creds.json');

passport.use(new LocalStrategy(function(user, password, done){
  if (user && password) {
    if (user == creds["admin"].username && password == creds["admin"].password) {
      return done(null, {id:1, user:user});
    } else return done(null, false);
  } else return done(null, false);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/admin/login');
}


var createQuery = function (params) {
  var gameQuery = "SF4";
  var searchString = new RegExp(params.search, "i");
  var timeFrame = params.search;
  var monQuery = {};
  var now = new Date();
  
  switch(params.search){
    case "previous week": 
      monQuery = {"playedAt": 
        {"$gte": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), 
        "$lt": now}};
      break;    
    case "previous month": 
      monQuery = {"playedAt": 
        {"$gte": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30), 
        "$lt": now}};
      break;    
      
    case "previous year": 
      monQuery = {"playedAt": 
        {"$gte": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 365), 
        "$lt": now}};
      break;
    default:
      monQuery = {title: {"$regex": searchString}}
  }
  
  return monQuery;  
};

module.exports.createQuery = createQuery;
module.exports.ensureAuthenticated = ensureAuthenticated;
