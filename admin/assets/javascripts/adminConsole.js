var get = Ember.get
  , set = Ember.set
  , copy = Ember.copy;

//Ember App Creation
var App = Ember.Application.create({
  rootElement: "#admin-content"
});

Ember.Handlebars.registerBoundHelper('prettyDate', function (date) {
  return moment(date).format("MMMM Do YYYY");
});

//Routes
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

App.MatchesMatchRoute = Ember.Route.extend({
  enter: function(){
    var matchCon = this.controllerFor('matches');
    matchCon.set("masterView", false);
  },
  model: function(params){
    var self = this;
    //sets route model and puts it on matches controller for the
    //component to use
    fetchMatches().then(function(results){
      window.match = results.matches.findBy("_id", params.match_id);
      var matchCon = self.controllerFor('matches');
      matchCon.set("match", match);
      return match;
    })
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
    var self = this;
    var matchCon = this.controllerFor('matches');
   
    var matches = get(matchCon, 'matches');
    matches.clear();
    
    fetchMatches()
    .then(function(results){
      matches.pushObjects(results.matches);
    });
    
    matchCon.set("masterView", true);
  }
  
});


//Controllers
App.MatchesController = Ember.Controller.extend({
  masterView: true,
  matches: [],
  actions:{
    deleted: function(){
      this.transitionToRoute('matches');
    }
  }
});

//Components
App.FcAdminMatchesComponent = Ember.Component.extend({
  matches: [],
});

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
      characters.pushObjects(results.games["1"].characters.sortBy("name"));
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
    makeFeatured: function(match){
      console.log(get(match, "_id"));
    },
    deleteMatch: function(match){
      var self = this;
      deleteMatch(match)
      .then(function(results){
        console.log(results);
        if (results.deletedMatch){
          self.sendAction();
        }
      })
    },
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

    set(self, "inFlight", true);
    submitMatch(data)
    .then(function (res) {
      console.log("yoyoyoyo", res);
      set(self, "inFlight", false);
      window.location.reload();
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

//ajax
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

var deleteMatch = function (data) {
  var id = data._id;
  var url = "/api/v1/matches/" + id + "/delete";
  return Ember.$.post(url, data);
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

//data conversion
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

