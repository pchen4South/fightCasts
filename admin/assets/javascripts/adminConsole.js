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
    console.log("matches index");
  },
  renderTemplate: function(){
    this.render('matchcreation',{
      into: 'matches',
      outlet: 'detail'
    });
  }
});

var fetchMatches = function(){
  return Ember.$.get("/api/v1/matches");
};

var fetchPeople = function(){
  return Ember.$.get("/api/v1/people");
};

// var fetchGames = function(){
  // return Ember.$.get("/api/v1/games");
// };

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

App.FcAdminMatchesComponent = Ember.Component.extend({
  didInsertElement: function(){
    window.matches = this.get("matches");
    fetchMatches()
    .then(function(results){
      matches.pushObjects(results.matches);
    });
  },
  matches: []
    
});

App.FcAdminSubheaderComponent = Ember.Component.extend({
  didInsertElement: function(){
    var self = this;
    fetchPeople()
    .then(function(results){
      var people = self.get("people");
      people.pushObjects(results.people);
    });
    
    fetchGames()
    .then(function(results){
      var characters = self.get("characters");
      window.res = results;
      characters.pushObjects(results.games.characters);
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