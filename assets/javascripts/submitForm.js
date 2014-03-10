var get = Ember.get
  , set = Ember.set
  , copy = Ember.copy;

var App = Ember.Application.create({
  rootElement: "#main-content"
});

var fetchGames = function () {
  return Ember.$.get("/api/v1/games")
};

App.FcSubmitMatchFormComponent = Ember.Component.extend({
  didInsertElement: function () {
    var games = this.get("games");

    fetchGames()
    .then(function (results) {
      games.pushObjects(results);
    });
  },

  games: [],

  data: {
    title: "",
    game: null,
    eventName: "",
    fighterData: [],
    casters: [],
    videos: []
  },

  onSubmit: function (data) {
    var data = {
      title: get(data, "title"),
      game: get(data, "game.id"),
      fighterData: get(data, "fighterData"),
      character: get(data, "character.id"),
      eventName: get(data, "eventName"),
      casters: get(data, "casters"),
      videos: get(data, "videos")
    }
    console.log(data);
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

    get(this, "fighters").pushObject(copy(newFighter));
    set(this, "newFighter.name", "");
    set(this, "newFighter.characters", []);
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
    url: "",
    name: "" 
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
    set(this, "newVideo.name", "");
  }
});

App.FcVideoSummaryComponent = Ember.Component.extend({
  removeVideo: function (video) {
    get(this, "videos").removeObject(video); 
  }
});
