var analytics = require('analytics-node');
var _ = require('lodash');  
var forEach = _.forEach;

var creds = require('../../creds.json');


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

var trackViewedVideo = function (focusedMatch, user) {
  
  //var clientId = extractGoogleAnalyticsCookie(gaCookie);
   console.log(user);
  forEach(focusedMatch.fighters, function(player){

    //playerObj.characters = player.characters;
    //players.push(playerObj);
    
    analytics.track({
      userId: "1",
      event: "Match View Player",
      properties: {
        //packageId: clientId,
       // user_id: user,
        category: 'Match Viewed',
        player: player.person.name,
      }
    });
    
    analytics.track({
      userId: "1",
      event: "Match View Character",
      properties: {
        category: 'Match Viewed',
        character: player.characters[0].name,
      }
    });
    
  });
  
  
    analytics.track({
      userId: "1",
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