var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var analytics = require('analytics-node');
var _ = require('lodash');  
var forEach = _.forEach;
var creds = require('../creds.json');

analytics.init({secret: creds['segmentKey']});

var extractGoogleAnalyticsCookie = function (gaCookie) {
  var cidSplit = gaCookie.split('.');
  return cidSplit[2] + '.' + cidSplit[3];
};

var trackCreatedContact = function (newContact, gaCookie) {
  var clientId = extractGoogleAnalyticsCookie(gaCookie);
  
  analytics.track({
    userId: clientId,
    event: 'New Contact Created', 
    properties: {
      email: newContact.email
    },
    context: {
      "Google Analytics": {
        clientId: clientId
      }
    }
  });
};

var trackViewedVideo = function (focusedMatch, gaCookie) {
  
  var clientId = extractGoogleAnalyticsCookie(gaCookie);
  var players = [];
    
  forEach(focusedMatch.fighters, function(player){
    var playerObj = {};
    playerObj.name = player.person.name;
    playerObj.characters = player.characters;
    players.push(playerObj);
    return;
  });
    
  analytics.track({
    userId: clientId,
    event: 'Match Viewed', 
    properties: {
      item: focusedMatch.title,
      label: focusedMatch.event.name,
      players: players
    },
    context: {
      "Google Analytics": {
        clientId: clientId
      }
    }
  });
}

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
                  
module.exports.trackViewedVideo = trackViewedVideo;
module.exports.trackCreatedContact = trackCreatedContact;
module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.createSubheaders = createSubheaders;
