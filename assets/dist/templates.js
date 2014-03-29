Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-casterSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<li>\n  <span>\n    ");
  stack1 = helpers._triageMustache.call(depth0, "caster.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </span>\n  <button class=\"btn btn-danger\"\n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeCaster", "caster", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Remove\n  </button>\n</li>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createCasterForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n  <div class=\"col-sm-8\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("newCaster.name")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  </div>\n  <div class=\"col-sm-4\">\n    <button class=\"btn btn-default\" \n      ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addCaster", "newCaster", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n      Add \n    </button>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createFighterForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n  <div class=\"col-sm-4\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("newFighter.name")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  </div>\n  <div class=\"col-sm-4\">\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'multiple': ("true"),
    'prompt': ("Select a character"),
    'content': ("characters"),
    'selection': ("newFighter.characters"),
    'optionValuePath': ("content.id"),
    'optionLabelPath': ("content.name")
  },hashTypes:{'disabled': "ID",'multiple': "STRING",'prompt': "STRING",'content': "ID",'selection': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'disabled': depth0,'multiple': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \n  </div>\n\n  <div class=\"col-sm-4\">\n    <button class=\"btn btn-default\" \n      ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createFighter", "newFighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n      Add \n    </button>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createVideoForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n  <div class=\"col-sm-8\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("newVideo.url")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  </div>\n  <div class=\"col-sm-4\">\n    <button class=\"btn btn-default\" \n      ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addVideo", "newVideo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n      Add \n    </button>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-fighterSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers._triageMustache.call(depth0, "character.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<li>\n  <span>\n  ");
  stack1 = helpers._triageMustache.call(depth0, "fighter.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  stack1 = helpers.each.call(depth0, "character", "in", "fighter.characters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </span>\n  <button class=\"btn btn-danger\" \n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteFighter", "fighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Remove\n  </button>\n</li>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-submitMatchForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression((helper = helpers['fc-fighterSummary'] || (depth0 && depth0['fc-fighterSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'fighterOne': ("data.fighterOne"),
    'fighter': ("fighter")
  },hashTypes:{'inFlight': "ID",'fighterOne': "ID",'fighter': "ID"},hashContexts:{'inFlight': depth0,'fighterOne': depth0,'fighter': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-fighterSummary", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression((helper = helpers['fc-fighterSummary'] || (depth0 && depth0['fc-fighterSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'fighterTwo': ("data.fighterTwo"),
    'fighter': ("fighter")
  },hashTypes:{'inFlight': "ID",'fighterTwo': "ID",'fighter': "ID"},hashContexts:{'inFlight': depth0,'fighterTwo': depth0,'fighter': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-fighterSummary", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['fc-casterSummary'] || (depth0 && depth0['fc-casterSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'casters': ("data.casters"),
    'caster': ("caster")
  },hashTypes:{'inFlight': "ID",'casters': "ID",'caster': "ID"},hashContexts:{'inFlight': depth0,'casters': depth0,'caster': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-casterSummary", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['fc-videoSummary'] || (depth0 && depth0['fc-videoSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'videos': ("data.videoData"),
    'video': ("video")
  },hashTypes:{'inFlight': "ID",'videos': "ID",'video': "ID"},hashContexts:{'inFlight': depth0,'videos': depth0,'video': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-videoSummary", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<form role=\"form\">\n  <div class=\"form-group\">\n    <label>Title</label>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.title")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Event Name</label> \n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.eventName")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  </div>\n\n  <div class=\"form-group\">\n    <label>Game</label>\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select a game"),
    'content': ("games"),
    'selection': ("data.game"),
    'optionLabelPath': ("content.name")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.game", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </div>\n\n  <div class=\"form-group\">    Player 1\n    ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createFighterForm'] || (depth0 && depth0['fc-createFighterForm']),options={hash:{
    'inFlight': ("inFlight"),
    'characters': ("data.game.characters"),
    'fighter': ("data.fighterOne")
  },hashTypes:{'inFlight': "ID",'characters': "ID",'fighter': "ID"},hashContexts:{'inFlight': depth0,'characters': depth0,'fighter': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createFighterForm", options))));
  data.buffer.push("\n    <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.fighterOne", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </div>  \n  \n  <ul class=\"form-group\">\n    ");
  stack1 = helpers.each.call(depth0, "fighter", "in", "data.fighterOne", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>  \n  \n  <div class=\"form-group\">\n    Player 2\n    ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createFighterForm'] || (depth0 && depth0['fc-createFighterForm']),options={hash:{
    'inFlight': ("inFlight"),
    'characters': ("data.game.characters"),
    'fighter': ("data.fighterTwo")
  },hashTypes:{'inFlight': "ID",'characters': "ID",'fighter': "ID"},hashContexts:{'inFlight': depth0,'characters': depth0,'fighter': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createFighterForm", options))));
  data.buffer.push("\n    <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.fighterTwo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </div>\n\n  \n  <ul class=\"form-group\">\n    ");
  stack1 = helpers.each.call(depth0, "fighter", "in", "data.fighterTwo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n\n  <div class=\"form-group\">\n    Casters\n    ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createCasterForm'] || (depth0 && depth0['fc-createCasterForm']),options={hash:{
    'inFlight': ("inFlight"),
    'casters': ("data.casters")
  },hashTypes:{'inFlight': "ID",'casters': "ID"},hashContexts:{'inFlight': depth0,'casters': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createCasterForm", options))));
  data.buffer.push("\n  </div>\n\n  <ul class=\"form-group\">\n    ");
  stack1 = helpers.each.call(depth0, "caster", "in", "data.casters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n\n  <div class=\"form-group\">\n    Videos\n    ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createVideoForm'] || (depth0 && depth0['fc-createVideoForm']),options={hash:{
    'inFlight': ("inFlight"),
    'videos': ("data.videoData")
  },hashTypes:{'inFlight': "ID",'videos': "ID"},hashContexts:{'inFlight': depth0,'videos': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createVideoForm", options))));
  data.buffer.push("\n    <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.videoData", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </div>\n\n  <ul class=\"form-group\">\n    ");
  stack1 = helpers.each.call(depth0, "video", "in", "data.videoData", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n\n  <button class=\"btn btn-default\"\n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Submit\n  </button> \n</form>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-videoSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<li>\n  <span>\n  ");
  stack1 = helpers._triageMustache.call(depth0, "video.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  stack1 = helpers._triageMustache.call(depth0, "video.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </span>\n  <button class=\"btn btn-danger\"\n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeVideo", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">Remove</button>\n</li>\n");
  return buffer;
  
});

Ember.TEMPLATES["fc-videoSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<li>\n  <span>\n    ");
  stack1 = helpers._triageMustache.call(depth0, "video.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers._triageMustache.call(depth0, "video.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </span>\n  <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeVideo", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">Remove</button>\n</li>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1;


  stack1 = helpers._triageMustache.call(depth0, "fc-submitMatchForm", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});