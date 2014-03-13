var get = Ember.get
  , set = Ember.set
  , copy = Ember.copy;

var App = Ember.Application.create({
  rootElement: "#main-content"
});

var fetchGames = function () {
  return Ember.$.get("/api/v1/games")
};

var submitMatch = function (data) {
  return Ember.$.post("/api/v1/submittedMatches", data);
};

var validateTitle = function (title) {
  return title ? "" : "Must provide a value for title";
};

var validateGame = function (game) {
  return game.id ? "" : "Must select a game";
};

var validateFighterData = function (fighterData) {
  return fighterData.length > 0 ? "" : "Must include at least one fighter";
};

var validateVideoData = function (videoData) {
  return videoData.length > 0 ? "" : "Must include at least one video";
};

App.FcSubmitMatchFormComponent = Ember.Component.extend({
  didInsertElement: function () {
    var games = this.get("games");
    console.log("submitform");
    fetchGames()
    .then(function (results) {
      games.pushObjects(results);
    });
  },

  inFlight: false,

  games: [],

  errors: {
    title: "",
    game: "",
    eventName: "",
    fighterOne: [],
    fighterTwo: [],
    casters: "",
    videoData: ""
  },

  data: {
    title: "",
    game: null,
    eventName: "",
    fighterOne: [],
    fighterTwo: [],
    casters: [],
    videoData: []
  },

  onSubmit: function (data) {
    var self = this;

    var data = {
      title: get(data, "title"),
      game: {
        id: get(data, "game.id"),
        name: get(data, "game.name"),
        nickname: get(data, "game.nickname")
      },
      fighterOne: get(data, "fighterOne"),
      fighterTwo: get(data, "fighterTwo"),
      eventName: get(data, "eventName"),
      casterNames: get(data, "casters").mapBy("name"),
      videoData: get(data, "videoData")
    }
    window.data = data;
    
    var titleError = validateTitle(data.title);
    var gameError = validateGame(data.game);
    var fighterOneError = validateFighterData(data.fighterOne);
    var fighterTwoError = validateFighterData(data.fighterTwo);
    var videoDataError = validateVideoData(data.videoData);

    set(this, "errors.title", titleError);
    set(this, "errors.game", gameError);
    set(this, "errors.fighterOneError", fighterOneError);
    set(this, "errors.fighterTwoError", fighterTwoError);
    set(this, "errors.videoData", videoDataError);

    if (titleError || gameError || fighterOneError
      ||fighterTwoError|| videoDataError) return;

    set(self, "inFlight", true);
    submitMatch(data)
    .then(function (res) {
      console.log("yoyoyoyo", res);
      window.location.reload();
    })
    .fail(function (err) {
      set(self, "inFlight", false);
      console.log("boo", err);
    });
  }
});

App.FcCreateFighterFormComponent = Ember.Component.extend({
  newFighter: {
    name: "",
    characters: []
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.createFighter(this.get("newFighter"));
    }
  },

  createFighter: function (newFighter) {
    var newFighter = newFighter || this.get("newFighter");

    get(this, "fighter").pushObject(copy(newFighter));
    set(this, "newFighter.name", "");
    set(this, "newFighter.characters", []);
    console.log("createFighter");
  }
});

App.FcFighterSummaryComponent = Ember.Component.extend({
  deleteFighter: function (fighter) {
    get(this, "fighterData").removeObject(fighter);
  },
});

App.FcCreateCasterFormComponent = Ember.Component.extend({
  newCaster: {
    name: "" 
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.addCaster(this.get("newCaster")); 
    } 
  },

  addCaster: function (newCaster) {
    var newCaster = newCaster || this.get("newCaster");

    get(this, "casters").pushObject(copy(newCaster)); 
    set(this, "newCaster.name", "");
  } 
});

App.FcCasterSummaryComponent = Ember.Component.extend({
  removeCaster: function (caster) {
    get(this, "casters").removeObject(caster); 
  }
});

App.FcCreateVideoFormComponent = Ember.Component.extend({
  newVideo: {
    url: ""
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.addVideo(this.get("newVideo")); 
    } 
  },

  addVideo: function (newVideo) {
    var newVideo = newVideo || this.get("newVideo");

    get(this, "videos").pushObject(copy(newVideo)); 
    set(this, "newVideo.url", "");
  }
});

App.FcVideoSummaryComponent = Ember.Component.extend({
  removeVideo: function (video) {
    get(this, "videos").removeObject(video); 
  }
});
