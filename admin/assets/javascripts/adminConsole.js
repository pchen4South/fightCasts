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



var fetchMatches = function(){
  return Ember.$.get("/api/v1/matches");
};

var fetchPeople = function(){
  return Ember.$.get("/api/v1/people");
};

var fetchGames = function(){
return Ember.$.get("/api/v1/games");
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



App.FcAdminDetailsComponent = Ember.Component.extend({
  didInsertElement: function(){
    window.people = this.get("people");
    var self = this;
    fetchPeople()
    .then(function(results){
      people.pushObjects(results.people);
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
  
  people: [],
  data: {
    title: "",
    description: "",
    casters: null,
    game: "",
    category: "",
    fighters: []
  },
  games: ["SF4"],
  characters: [],
  categories: ["pro", "scrub", "community"],

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
      window.newf = newFighter;
      var newFighter = newFighter || this.get("newFighter");

      get(this, "fighter").pushObject(copy(newFighter));
      set(this, "newFighter.person", "");
      set(this, "newFighter.characters", []);
      console.log("createFighter", newFighter);
    }
  }
});