var api = require('../api');

module.exports = function (app) {

  //PLAYER
  app.post("/api/v1/people", api.createPerson);

  //CHARACTER
  app.post("/api/v1/characters", api.createCharacter);
  app.get("/api/v1/characters", function (req, res) {
    api.getCharacters(function (err, characters) {
      if (err) res.send(400, {err: err.message});
      res.json(characters); 
    }); 
  });

  //GAME
  app.post("/api/v1/games", api.createGame);
  app.get("/api/v1/games", function (req, res) {
    api.getGamesNested(function (err, games) {
      if (err) res.send(400, {err: err.message});
      res.json(games); 
    }); 
  });

  //VIDEO
  app.post("/api/v1/videos", api.createVideo);

  //EVENT
  app.post("/api/v1/events", api.createEvent);

  //CHANNEL
  app.post("/api/v1/channels", api.createChannel);

  //TEAM
  app.post("/api/v1/teams", api.createTeam);

  //FIGHTER

  //MATCH
  app.post("/api/v1/submittedMatches", 
              api.createSubmittedMatch);
};
