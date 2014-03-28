var mongoose = require('mongoose');
var _ = require('lodash');
var keys = _.keys;
var partial = _.partial;
var forEach = _.forEach;
var prompt = require('prompt');
var async = require('async');

var people = require('./seeds/people');
var videos = require('./seeds/videos');
var events = require('./seeds/events');
var channels = require('./seeds/channels');
var teams = require('./seeds/teams');
var fighters = require('./seeds/fighters');
var matches = require('./seeds/matches');
var games = require('../models/gameCharacterData');

var personModel = require('../models/personModel');
var videoModel = require('../models/videoModel');
var eventModel = require('../models/eventModel');
var channelModel = require('../models/channelModel');
var teamModel = require('../models/teamModel');
var fighterModel = require('../models/fighterModel');
var matchModel = require('../models/matchModel');
var featuredMatchModel = require('../models/featuredMatchModel');

var peopleCreation = function(done){
  async.map(people, partial(create, personModel.model), done);
};

var videosCreation = function(done){
  async.map(videos, partial(create, videoModel.model), done);
};

var eventsCreation = function(done){
  async.map(events, partial(create, eventModel.model), done);
};

var channelsCreation = function(done){
  async.map(channels, partial(create, channelModel.model), done);
};

var teamsCreation = function(done){
  async.map(teams, partial(create, teamModel.model), done);
};

var fighterCreation = function(done){
  async.map(fighters, findModelsAndCreateFighters, done);
}

var matchCreation = function(done){
  async.map(matches, findModelsAndCreateMatches, done);
}

var find = function(modelType, query, done){

  modelType.model.find({name: query}, function(err, res){
    if (err) { 
      console.log(err);
      done(err);
    }
    else{
      done(null,res);
    }
  });
};

var findPersonForFighter = function(fighterName, cb){
  
  personModel.model.find({name: fighterName}, function(err,res){
    if (err){
      console.log("PERSON NOT FOUND");
      cb(err);
    }
    else
    {
     fighterModel.model.find({_person: res[0]}, function(err,res){
        if (err){
        console.log("fighter not found");
        cb(err);
        }
        else{
          if(res.length == 0)
            console.log("not found fighter: ", res.length);
          cb(err,res);
        }
     });
    }
  });
}

var findPersonForCaster = function(casterName, cb){
  personModel.model.find({name: casterName}, function(err,res){
    if (err){
      cb(err);
    }
    else
    {
     cb(err, res);
    }
  });
}


var findFighters = function(fighters, cb){
  async.map(fighters, findPersonForFighter, cb);  
};

var findCasters = function(casters, cb){
  async.map(casters, findPersonForCaster, cb);  
};

var findModelsAndCreateMatches  = function(match, done){
  //console.log(match.fighterOne);
  async.parallel([
    //match.title -> title
    async.apply(findPersonForFighter, match.fighterOne),
    async.apply(findPersonForFighter, match.fighterTwo),
    async.apply(findCasters, match.casterNames),
    async.apply(find, videoModel, match.videoNames), 
    async.apply(find, eventModel, match.eventName),
    
    ],
    function(err, results){
      var fighterOne = results[0][0];
      var fighterTwo = results[1][0];
      var casterArray = results[2];
      
      var videos = results[3];
      var event = results[4][0];
      var casters = cleanNestedArray(casterArray);
      
      //results is an array of all the models
      //results[0] is an array of [{playerJSON}]
      matchModel.model.create({
        title: match.title,
        featured: match.featured,
        approved: match.approved,
        description: match.description,
        _casters: casters,
        _fighterOne: fighterOne,
        _fighterTwo: fighterTwo,
        _videos: videos,
        game: match.game,
        _event: event,
        category: match.category
      }, function(err,res){
        if(err){done(err)}
        else{
          // console.log("match created: ", res);
          done(null, res);      
        }
      });
    }
  );
};

var cleanNestedArray = function(arr){
  var cleaned = [];
   
  for(var i = 0; i < arr.length; i++){
    cleaned[i] = arr[i][0];
  }
  //console.log(cleaned);
  return cleaned;
}


var findModelsAndCreateFighters = function(fighter, cb){
  console.log(fighter);
  personModel.model.find({name: fighter.name}, function(err, result){
    if (err){cb(err)}
    else
      fighterModel.model.create({characters: fighter.character, _person: result[0]}, function(err, res){
        if (err){
        console.log("fightermodel problem");
        cb(err);
        }
        else {
          console.log("fighter created");
          cb(null, res);
        }
      })
  })
};


var create = function(modelType, data, cb){
  modelType.create(data, function(err, res){
    if (err) { 
      console.log(err);
      cb(err);
    }
    else{
      //console.log(modelType.modelName + "created: ", res.name);
      cb(null,res);
    }
  });  
}

var featuredMatchCreation = function(cb){
  matchModel.model.find({}, function(err, res){
    console.log(res[3]);
    featuredMatchModel.model.create({_match: res[0], game: res[0].game, category: res[0].category}, function(err,result){
       featuredMatchModel.model.create({_match: res[3], game: res[3].game, category: res[3].category}, function(err,result){
          console.log(res);
          cb(null,res);
      })
    })
   })
}

var resetDb = function (mongoose) {
  mongoose.connect('mongodb://localhost:27017/fightCasts', function (err) {
    mongoose.connection.db.dropDatabase(function (err) {
      console.log("database Dropped");

      async.series([peopleCreation,
                    videosCreation,
                    eventsCreation,
                    channelsCreation,
                    teamsCreation, 
                    fighterCreation,
                    matchCreation,
                    featuredMatchCreation], 
                    
                    function(err, res){
                      if (err)
                        console.log (err);
                      else
                        console.log ("done with seeding");
                        mongoose.disconnect();
                    });
      
    });
  });
};

//uncomment for resetting on modulus server
// module.exports = resetDb;

prompt.start();

prompt.get("password", function (err, result) {
  if (result.password === "admin") resetDb(mongoose);
  else console.log("Invalid password");
});
