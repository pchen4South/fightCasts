var api = require('../api');

module.exports = function (app) {

  //PLAYER
  app.post("/api/v1/people", api.createPerson);

  //CHARACTER
  app.post("/api/v1/characters", api.createCharacter);

  //GAME
  app.post("/api/v1/games", api.createGame);

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

};
