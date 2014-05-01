require("multi-select.js");
var get = Ember.get;
var set = Ember.set;

App.FormsMultiselectComponent = Ember.Component.extend({
  didInsertElement: function(){
  console.log(this.get('widget'), "ineserted");
  },
  
  setDefaultSearch: function () {
    set(this, "search", this.get("widget.search")); 
  }.on("init"),

  focusIn: function () {
    set(this, "widget", focus(this.widget, true)); 
  },

  //wrap this in timeout to allow dropdown to be clicked before vanishing
  focusOut: function (e) {
    Ember.run.later(this, function () {
      set(this, "widget", focus(this.widget, false)); 
    }, 100);
  },

  //wrap selections with "active" for templating
  matches: function () {
    var matches = this.get('widget.matches'); 
    var selectionIndex = this.get('widget.selectionIndex');

    return matches.map(function (match, index) {
      return {
        match: match,
        active: selectionIndex === index
      }; 
    });
  }.property("widget.matches.[]", "widget.selectionIndex"),

  //observes our widget's selections and sets them to a bound prop
  updateValues: function () {
    set(this, "values", this.get('widget.selections'));
  }.observes("widget.selections.[]"),

  //when search changes, update widget
  updateSearch: function () {
    set(this, "widget", updateSearch(this.widget, this.search)); 
  }.observes("search"),

  actions: {
    addSelection: function (value) {
      set(this, "widget", addSelection(this.widget, value));
      set(this, "search", "");
    },

    addActiveSelection: function () {
      set(this, "widget", addActiveSelection(this.widget));
      set(this, "search", "");
    },

    removeSelection: function (selection) {
      var index = this.widget.selections.indexOf(selection);

      set(this, "widget", removeSelection(this.widget, index));
    },

    removeLastSelection: function () {
      set(this, "widget", removeLastSelection(this.widget));
    }
  }
});