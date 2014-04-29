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
enter: function(){
    var self = this;
    var indexCon = this.controllerFor('index');
    
    var matches = get(indexCon, 'matches');
    matches.clear();
    
    var people = get(indexCon, 'people');
    people.clear();
    
    var events = get(indexCon, 'events');
    events.clear();
    
    var users = get(indexCon, 'users');
    users.clear();
    
    fetchMatches()
    .then(function(results){
      matches.pushObjects(results.matches);
    });
    
    fetchPeople()
    .then(function(results){
      people.pushObjects(results.people.sortBy("name"));
    });
    
    fetchEvents()
    .then(function(results){
      events.pushObjects(results.events.sortBy("name"));
      window.evnts = results.events;
    }); 
    fetchUsers()
    .then(function(results){
      users.pushObjects(results.users.sortBy("email"));
    }); 
  }
});

App.IndexController = Ember.Controller.extend({
  matches: [],
  people: [],
  events: [],
  users: []

});

App.MatchesMatchRoute = Ember.Route.extend({
  isEditingMatch: false,
  enter: function(){
    var matchCon = this.controllerFor('matches');
    matchCon.set("masterView", false);
    this.send("populateItems");  
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
  },
  actions:{
    editMatch: function(){
      this.controllerFor('matches').set('isEditingMatch', true);
    },
    doneEditingMatch: function(){
      this.controllerFor('matches').set('isEditingMatch', false)
    }
  }
});

App.MatchesIndexRoute = Ember.Route.extend({
  enter: function(){  
    var matchCon = this.controllerFor('matches');  
    matchCon.set("masterView", true);
    this.send("populateItems");
  }
});

App.MatchesRoute = Ember.Route.extend({
  renderTemplate: function(){
    this.render('matches',{
      into: 'application'
    });
  },
  sendMatchToServer: function(match){
  
  },
  populateItems: function(){
    var self = this;
    var matchCon = this.controllerFor('matches');
   
    var matches = get(matchCon, 'matches');
    matches.clear();
    
    var people = get(matchCon, 'people');
    people.clear();
    
    var events = get(matchCon, 'events');
    events.clear();
    
    var characters = get(matchCon, 'characters');
    characters.clear();
    
    fetchMatches()
    .then(function(results){
      matches.pushObjects(results.matches);
    });
    
    fetchPeople()
    .then(function(results){
      people.pushObjects(results.people.sortBy("name"));
    });
    
    fetchEvents()
    .then(function(results){
      events.pushObjects(results.events.sortBy("name"));
      window.evnts = results.events;
    }); 
    
    //seems slightly wrong for multiple game types
    //doesn't seem to be an array
    //works for now as the default 1 game Sf4
    fetchGames()
    .then(function(results){
      window.res = results;
      characters.pushObjects(results.games["1"].characters.sortBy("name"));
    });
  }, 
  actions:{
    populateItems: function(){
      this.populateItems();
    }
  }
});


//Controllers
App.MatchesController = Ember.Controller.extend({
  masterView: true,
  matches: [],
  events: [],
  characters: [],
  people: [],
  actions:{
    deleted: function(){
      this.transitionToRoute('matches');
    },

    updateInfo: function(){

      var people = get(this, 'people');
      people.clear();
      
      var events = get(this, 'events');
      events.clear();
      
      fetchPeople()
      .then(function(results){
        people.pushObjects(results.people.sortBy("name"));
      });
    
      fetchEvents()
      .then(function(results){
        events.pushObjects(results.events.sortBy("name"));
        window.evnts = results.events;
      }); 
    }
  }
});

//Components
App.FcAdminMatchesComponent = Ember.Component.extend({
  matches: []
});

App.FcAdminCreateComponent = Ember.Component.extend({

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
  errors: {
    title: "",
    game: "",
    eventName: "",
    fighters: "",
    casters: "",
    videoData: ""
  },
  actions: {
    onSubmit: function(data){
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
          
      var self = this;
      var titleError = validateTitle(data.title);
      var gameError = validateGame(data.game);
      var fighterError = validateFighterData(data.fighters);
      var videoDataError = validateVideoData(data.videos);
      var categoryError = validateCategory(data.category);

      set(this, "errors.title", titleError);
      set(this, "errors.game", gameError);
      set(this, "errors.fighters", fighterError);
      set(this, "errors.videoData", videoDataError);
      set(this, "errors.category", categoryError);
      
      if (titleError || gameError || fighterError
        ||categoryError|| videoDataError) return;;
      
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
})

App.FcAdminEditDetailsComponent = Ember.Component.extend({
  didInsertElement:function(){
    window.fcadmin = this;
    console.log(this.get('elementId'));
    this.initializeData();
  },
  categories: ["pro", "scrub", "community"],
  games:["SF4"],
  
  // game hardcoded still for now
  initializeData: function(){
    var match = this.get('match');
    window.m = match;
    window.dd = this;
    var data = this.get('data');
    vidList = [];
    
    console.log("INITIALIZING DATAS", get(match,'casters'));
    if(match){
      get(match,'videos').forEach(function(vid){
       vidList.push({"url": vid});
      });
      
      set(data, 'title', get(match,'title'));
      set(data,'description', get(match,'description'));
      set(data,'casters', get(match,'casters'));
      set(data,'game', get(match,'game'));
      set(data,'event', get(match,'event'));
      set(data,'category', get(match,'category'));
      set(data,'event', get(match,'event'));
      set(data,'playedAt', get(match,'playedAt').slice(0,10));
      set(data,'fighters', get(match,'fighters') || []);
      set(data,'videoData', vidList);
    }
  },
  data: {
    title: "",
    description: "",
    casters: null,
    game: "SF4",
    category: "",
    fighters: [],
    videoData: [],
    event: null,
    playedAt: null
  }, 
  errors: {
    title: "",
    game: "",
    eventName: "",
    fighters: "",
    casters: "",
    videoData: ""
  },
  actions:{
    doneEditing: function(){
      var self = this;
      var data = this.get("data");
      
      window.thisdata = data;
      
      var dataToSend = {
        title: get(data, "title"),
        game: get(data, "game"),
        description: get(data, "description"),
        fighters: convertFighterFieldsToIds(get(data, "fighters")),
        event: get(data, "event._id"),
        casters: get(data, "casters").mapBy("_id"),
        videos: get(data, "videoData").mapBy('url'), 
        playedAt: get(data, "playedAt"),
        category: get(data, "category"),
      };
      
      var titleError = validateTitle(dataToSend.title);
      var gameError = validateGame(dataToSend.game);
      var fighterError = validateFighterData(dataToSend.fighters);
      var videoDataError = validateVideoData(dataToSend.videos);
      var categoryError = validateCategory(dataToSend.category);

      set(this, "errors.title", titleError);
      set(this, "errors.game", gameError);
      set(this, "errors.fighters", fighterError);
      set(this, "errors.videoData", videoDataError);
      set(this, "errors.category", categoryError);
      
      
      if (titleError || gameError || fighterError
        ||categoryError|| videoDataError) return;
      
      set(self, "inFlight", true);
      updateMatch(dataToSend, get(this, 'match'))
      .then(function (res) {
        console.log("yoyoyoyo", res);
        set(self, "inFlight", false);
        //self.sendAction();
        window.location.reload();
      })
      .fail(function (err) {
        set(self, "inFlight", false);
        console.log("boo", err);
      })
    }  
  }
});


App.FcAdminDetailsComponent = Ember.Component.extend({
  
  actions:{
    editMatch: function(){
      this.sendAction("editMatch");
    },
    makeFeatured: function(match){
      console.log(get(match, "_id"));
      makeMatchFeatured(match)
      .then(function(results){
        if(results.featuredMatch){
          window.location.reload();
        }
      });
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
    }
  }  
});



App.FcAdminSubheaderComponent = Ember.Component.extend({
  data: {
    country: "",
    name: "",
    character: ""
  },
  inFlight: false,
  resetFields:function(){
    var data = this.get("data");
    set(this,"data.country", "");
    set(this,"data.name", "");   
    set(this,"data.character", "");   
  },
  updateInfo: function(){
    this.sendAction();
  },
  actions:{
    onSubmit: function(data, type){
      var self = this;
      set(self, "inFlight", true);
      submitData(data, type)
      .then(function (res) {
       self.resetFields();
       self.updateInfo();
       set(self, "inFlight", false);
      })
      .fail(function(err){
        set(self, "inFlight", false);
        console.log("Error", err);
        self.updateInfo();
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

App.FcAdminSummaryComponent = Ember.Component.extend({});

App.FcAdminSummaryItemComponent = Ember.Component.extend({
  isEditing: false,
  categoryAttribute: "",
  // singluar form of type
  typeSingular: function(){
    var type = get(this, 'type');
    if (type){
      if (type == "matches")
        return "match";
      else if (type == "people"){
        return "person";
      } else {
      return type.slice(0, type.length - 1);
      }
    }
  }.property('type'),
  // Helper to set value of input element
  initializeValues: function(){
    var item = get(this, "item");
    var attr = get(this, "categoryAttribute");
    item["attrValue"] = get(item, attr);
  },
  // Label outside of the input field
  categoryLabel: function(){
    type = this.get('type');
    if (type == "matches"){
      set(this, "categoryAttribute", "title");
      return "Title: ";
    } else if (type == "users"){
      set(this, "categoryAttribute", "email");
      return "Email: ";
    } else {
      set(this, "categoryAttribute", "name");
      return "Name: ";  
    }
  }.property('type'),
  actions:{
    deleteItem: function (type, item) {
      var id = item._id;
      var url = "/api/v1/" + type + "/" + id + "/delete";
      
      Ember.$.post(url, item)
      .then(function(res){
        window.location.reload();
      })
      .fail(function(err){
        alert("item was not deleted");
      })
    },
    modifyItem: function(type, item){
      this.initializeValues();
      set(this, 'isEditing', true); 
    },
    saveChanges: function(type, item){
      var field = get(this, "categoryAttribute");     
      var type = get(this, "typeSingular");
      var data = {};
      data[field] = get(item, 'attrValue');
      
      // build the function call string
      var fnType = window["update" + type.charAt(0).toUpperCase() + type.slice(1)];
      
      
      fnType(data, item)
      .then(function(res){
        window.location.reload();
      })
      .fail(function(err){
        console.log("failed");
        set(this, 'isEditing', false);
      });
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

var fetchUsers = function(){
return Ember.$.get("/api/v1/users");
};

var submitMatch = function (data) {
  return Ember.$.post("/api/v1/matches", data);
};

var updateMatch = function(data, match){
  if(match._id){
    var url = "/api/v1/matches/" + match._id;
    return Ember.$.post(url, data);
  }
  else
    alert("problems with update");
};

var updateUser = function(data, user){
  if(user._id){
    var url = "/api/v1/users/" + user._id;
    return Ember.$.post(url, data);
  }
  else
    alert("problems with update");
};

var updatePerson = function(data, person){
  if(person._id){
    var url = "/api/v1/people/" + person._id;
    return Ember.$.post(url, data);
  }
  else
    alert("problems with update");
};

var updateEvent = function(data, event){
  if(event._id){
    var url = "/api/v1/events/" + event._id;
    return Ember.$.post(url, data);
  }
  else
    alert("problems with update");
};

var makeMatchFeatured = function (data) {
  var id = data._id;
  var url = "/api/v1/matches/" + id + "/feature";
  return Ember.$.post(url, data);
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


var validateTitle = function (title) {
  return title ? "" : "Must provide a value for title";
};

var validateGame = function (game) {
  return game ? "" : "Must select a game";
};

var validateFighterData = function (fighterData) {
  return fighterData.length > 0 ? "" : "Must include at least one fighter";
};

var validateVideoData = function (videoData) {
  return videoData.length > 0 ? "" : "Must include at least one video";
};

var validateCategory = function (category) {
  return category ? "" : "Must select category";
};