var get = Ember.get
  , set = Ember.set
  , copy = Ember.copy;

var App = Ember.Application.create({
  rootElement: "#admin-content"
});

App.Router.map(function(){
  this.resource("matches", function(){
    this.route("match", {path: ':match_id'});
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function(router){
    this.transitionTo('matches');
  }
});

App.MatchesRoute = Ember.Route.extend({
  renderTemplate: function(){
    this.render('matches',{
      into: 'application'
    });
  }
});

App.MatchesIndexRoute = Ember.Route.extend({
  enter: function(){
    var matchCon = this.controllerFor('matches');
    matchCon.set("createFlag", true);
  },
});

App.MatchRoute = Ember.Route.extend({
  enter: function(){
    var matchCon = this.controllerFor('matches');
    matchCon.set("createFlag", false);
  }
})


App.MatchesController = Ember.Controller.extend({
  createFlag: false
});

App.FcAdminMatchesComponent = Ember.Component.extend({
  didInsertElement: function(){
    var matches = this.get("matches");
    
    fetchMatches()
    .then(function(results){
      matches.pushObjects(results.matches);
    });
  
  },
  matches: [],

});




var convertFighterFieldsToIds = function(fighterArray){
  var convertedArray = [];
  fighterArray.forEach(function(fighter){
    var convertedFighter = {
            "person": get(fighter, "person._id"), 
            "characters": get(fighter, "characters").mapBy("id")};
    convertedArray.push(convertedFighter);
  });
  return convertedArray;
};

App.FcAdminDetailsComponent = Ember.Component.extend({
  didInsertElement: function(){
    window.people = this.get("people");
    var self = this;
    fetchPeople()
    .then(function(results){
      people.pushObjects(results.people);
    });
    
    fetchEvents()
    .then(function(results){
      var events = get(self, "events");
      events.pushObjects(results.events);
      window.evnts = results.events;
    }); 
    
    //seems slightly wrong for multiple game types
    //doesn't seem to be an array
    //works for now as the default 1 game Sf4
    fetchGames()
    .then(function(results){
      window.res = results;
      window.characters = self.get('characters');
      characters.pushObjects(results.games["1"].characters);
    });
  },
  events: [],
  people: [],
  data: {
    title: "",
    description: "",
    casters: null,
    game: "",
    category: "",
    fighters: [],
    videoData: [],
    event: null,
    playedAt: null
  },
  games: ["SF4"],
  characters: [],
  categories: ["pro", "scrub", "community"],
  actions:{
    onSubmit: function(data){
      var self = this;
      
      var data = {
        title: get(data, "title"),
        game: get(data, "game"),
        description: get(data, "description"),
        fighters: convertFighterFieldsToIds(get(data, "fighters")),
        event: get(data, "event._id"),
        casters: get(data, "casters").mapBy("_id"),
        videos: get(data, "videoData"), 
        playedAt: get(data, "playedAt"),
        category: get(data, "category"),
      }
    window.data = data;
    
    // // var titleError = validateTitle(data.title);
    // // var gameError = validateGame(data.game);
    // // var fighterOneError = validateFighterData(data.fighterOne);
    // // var fighterTwoError = validateFighterData(data.fighterTwo);
    // // var videoDataError = validateVideoData(data.videoData);

    // // set(this, "errors.title", titleError);
    // // set(this, "errors.game", gameError);
    // // set(this, "errors.fighterOneError", fighterOneError);
    // // set(this, "errors.fighterTwoError", fighterTwoError);
    // // set(this, "errors.videoData", videoDataError);

    // if (titleError || gameError || fighterOneError
      // ||fighterTwoError|| videoDataError) return;

    set(self, "inFlight", true);
    submitMatch(data)
    .then(function (res) {
      console.log("yoyoyoyo", res);
      set(self, "inFlight", false);
      //window.location.reload();
    })
    .fail(function (err) {
      set(self, "inFlight", false);
      console.log("boo", err);
    });
    }
  }  
});



App.FcAdminSubheaderComponent = Ember.Component.extend({
  didInsertElement: function(){
    var self = this;
    fetchPeople()
    .then(function(results){
      var people = self.get("people");
      people.pushObjects(results.people);
    });
  },
  data: {
    country: "",
    name: "",
    character: ""
  },
  people: [],
  characters: [],
  inFlight: false,
  resetFields:function(){
    var data = this.get("data");
    set(this,"data.country", "");
    set(this,"data.name", "");   
    set(this,"data.character", "");   
  },
  actions:{
    onSubmit: function(data, type){
      console.log(type);
      var self = this;
      set(self, "inFlight", true);
      submitData(data, type)
      .then(function (res) {
        console.log(type, " made", res);
       // window.location.reload();
       self.resetFields();
       set(self, "inFlight", false);
      })
      .fail(function(err){
        set(self, "inFlight", false);
        console.log("Error", err);
        self.resetFields();
      });
    }
  }
})

App.FcCreateFighterFormComponent = Ember.Component.extend({
  newFighter: {
    person: "",
    characters: []
  },
  
  actions:{
    createFighter: function (newFighter) {
      var newFighter = newFighter || this.get("newFighter");
      get(this, "fighter").pushObject(copy(newFighter));
      set(this, "newFighter.person", "");
      set(this, "newFighter.characters", []);
    }
  }
});

App.FcCreateVideoFormComponent = Ember.Component.extend({
  newVideo: {
    url: ""
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.send("addVideo");
    } 
  },
  actions:{
    addVideo: function (newVideo) {
      var newVideo = newVideo || this.get("newVideo");
      
      get(this, "videos").pushObject(copy(newVideo)); 
      set(this, "newVideo.url", "");
    }
  }
});

App.FcVideoSummaryComponent = Ember.Component.extend({
  actions:{
    removeVideo: function (video) {
      get(this, "videos").removeObject(video); 
    }
  }
});

App.FcFighterSummaryComponent = Ember.Component.extend({
  tagNames: "ul",
  attributeBindings: ["style"],
  style: "list-style-type:none",
  fighters:[],
  actions:{
    deleteFighter: function (fighter) {
      get(this, "fighters").removeObject(fighter);
    }
  }
});


//HELPERS


var fetchMatches = function(){
  return Ember.$.get("/api/v1/matches");
};

var fetchPeople = function(){
  return Ember.$.get("/api/v1/people");
};

var fetchEvents = function(){
  return Ember.$.get("/api/v1/events");
};

var fetchGames = function(){
return Ember.$.get("/api/v1/games");
};

var submitMatch = function (data) {
  return Ember.$.post("/api/v1/matches", data);
};

var submitData = function (data, type){
  switch(type){
    case "person":
      return Ember.$.post("/api/v1/people", data);
      break;
    case "event":
      return Ember.$.post("/api/v1/events", data);
      break;
  }
};