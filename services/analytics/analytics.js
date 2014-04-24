var analytics = require('analytics-node');
var _ = require('lodash');  
var forEach = _.forEach;
var creds = require('../../config.json').services.analytics;

analytics.init({secret: creds['segmentKey']});


var trackCreatedContact = function (newContact) {

  analytics.identify(newContact.id, {
    email: newContact.email
  });

};

var trackViewedVideo = function (focusedMatch, user) {
  if (!user){
    user = {"email": "anonymous"};
  }
  forEach(focusedMatch.fighters, function(player){
    //player info for each fighter
    analytics.track({
      userId: user.email,
      event: "Match View Player",
      properties: {
        category: 'Match Viewed',
        player: player.person.name,
      }
    });
    
    //character info for the match
    forEach(player.characters, function(character){
      analytics.track({
        userId: user.email,
        event: "Match View Character",
        properties: {
          category: 'Match Viewed',
          character: character.name
        }
      });
    });
  });
  
  //Overall match info
  analytics.track({
    userId: user.email,
    event: "Match View",
    properties: {
      category: 'Match Viewed',
      title: focusedMatch.title,
      event_name: focusedMatch.event.name,
    }
  });

}

                  
module.exports.trackViewedVideo = trackViewedVideo;
module.exports.trackCreatedContact = trackCreatedContact;