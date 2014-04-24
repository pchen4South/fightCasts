var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var creds = require('../creds.json');

//passport.use(new LocalStrategy(function(user, password, done){
//  if (user && password) {
//    if (user == creds["admin"].username && password == creds["admin"].password) {
//      return done(null, {id:1, user:user});
//    } else return done(null, false);
//  } else return done(null, false);
//}));
//
//passport.serializeUser(function(user, done) {
//  done(null, user);
//});
//
//passport.deserializeUser(function(user, done) {
//  done(null, user);
//});

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/admin/login');
}

//returns subheaders which depend on querystring
var createSubheaders = function (querystring) {
  var defaultHeaders = {
    topLeft: 'top pro match',
    topRight: 'top community match',
    botLeft: 'new pro matches',
    botRight: 'new community matches',
  }; 
  var queryHeaders = {
    botLeft: "pro results: ",
    botRight: "community results: "
  };

  return querystring ? queryHeaders : defaultHeaders;
};

module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.createSubheaders = createSubheaders;
