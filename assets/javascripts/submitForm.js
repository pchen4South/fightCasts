var App = Ember.Application.create({
  rootElement: "#main-content"
});

App.FcSubmitMatchFormComponent = Ember.Component.extend({
  data: {
    title: "",
    game: null,
    eventName: "",
    fighterData: [],
    casterNames: [],
    videos: []
  },

  onSubmit: function (data) {
    console.log(data);
  }
});
