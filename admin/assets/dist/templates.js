Ember.TEMPLATES["_createEvent"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminFormWrapper\">\r\n  <form role=\"form\">  \r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Name</label>\r\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'class': ("form-control"),
    'value': ("data.name"),
    'placeholder': ("Event Name")
  },hashTypes:{'type': "STRING",'disabled': "ID",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div> \r\n    <button class=\"btn btn-info\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", "event", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","STRING"],data:data})));
  data.buffer.push(">\r\n      create!\r\n    </button> \r\n  </form> \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_createFighter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminFormWrapper\">\r\n  <form role=\"form\">\r\n    <div class=\"form-group\">\r\n      <label for=\"person\">Player</label>\r\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select a person"),
    'content': ("people"),
    'selection': ("data.name"),
    'optionValuePath': ("content.name"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \r\n\r\n      <label for=\"characters\">Character</label>\r\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select a character"),
    'content': ("characters"),
    'selection': ("data.character"),
    'optionValuePath': ("content.name"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \r\n      \r\n    </div> \r\n     <button class=\"btn btn-info\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", "fighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","STRING"],data:data})));
  data.buffer.push(">\r\n      create!\r\n    </button> \r\n  </form> \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_createPerson"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminFormWrapper\">\r\n  <form role=\"form\">\r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Name</label>\r\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'class': ("form-control"),
    'value': ("data.name"),
    'placeholder': ("name")
  },hashTypes:{'type': "STRING",'disabled': "ID",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n      <label for=\"name\">Country</label>\r\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'class': ("form-control"),
    'value': ("data.country"),
    'placeholder': ("2 letter country code")
  },hashTypes:{'type': "STRING",'disabled': "ID",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div> \r\n    <button class=\"btn btn-info\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", "person", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","STRING"],data:data})));
  data.buffer.push(">\r\n      create!\r\n    </button> \r\n  </form> \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_matchcreation"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<form role=\"form\">\r\n  <div class=\"form-group\">\r\n    <label>Create a Match</label>\r\n    \r\n    <div class=\"form-group tile-12x1\">\r\n      <label>Title</label>\r\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.title"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n      <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div>\r\n    \r\n    <div class=\"form-group tile-12x1\">\r\n      <label>Description</label> \r\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.description"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n    \r\n    <div class=\"form-group tile-4x1\">\r\n      <label>Game</label>\r\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select game"),
    'content': ("games"),
    'selection': ("data.game"),
    'optionLabelPath': ("content"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n      <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.game", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div>\r\n    \r\n      <div class=\"form-group tile-12x3\"> \r\n        <label> Fighters </label>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createFighterForm'] || (depth0 && depth0['fc-createFighterForm']),options={hash:{
    'inFlight': ("inFlight"),
    'characters': ("characters"),
    'fighter': ("data.fighters"),
    'people': ("people")
  },hashTypes:{'inFlight': "ID",'characters': "ID",'fighter': "ID",'people': "ID"},hashContexts:{'inFlight': depth0,'characters': depth0,'fighter': depth0,'people': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createFighterForm", options))));
  data.buffer.push("\r\n        <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.fighterOne", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div> \r\n    \r\n    <div class=\"form-group tile-12x2\"> \r\n      <label> Players to Add: </label>\r\n      ");
  data.buffer.push(escapeExpression((helper = helpers['fc-fighterSummary'] || (depth0 && depth0['fc-fighterSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'fighters': ("data.fighters")
  },hashTypes:{'inFlight': "ID",'fighters': "ID"},hashContexts:{'inFlight': depth0,'fighters': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-fighterSummary", options))));
  data.buffer.push("\r\n    </div>\r\n    <div class=\"form-group tile-4x1\">\r\n      <label for=\"category\">Category</label>\r\n\r\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Category"),
    'content': ("categories"),
    'selection': ("data.category"),
    'optionLabelPath': ("content"),
    'optionValuePath': ("content"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n      <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.game", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div>\r\n    \r\n    <div class=\"form-group tile-5x3\">\r\n      <label for=\"casters\">Casters</label>\r\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Casters"),
    'multiple': (true),
    'content': ("people"),
    'selection': ("data.casters"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'multiple': "BOOLEAN",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'multiple': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n\r\n    \r\n    <div class=\"form-group tile-5x1\">\r\n      <label>Event Name</label> \r\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.eventName"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n    \r\n    \r\n    <div class=\"form-group tile-5x1\">\r\n      <label for=\"playedAt\">Date Played</label>\r\n       ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("date"),
    'disabled': ("inFlight"),
    'value': ("data.playedAt"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group tile-12x2\">\r\n      <label for=\"videos\">Videos</label>\r\n       ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createVideoForm'] || (depth0 && depth0['fc-createVideoForm']),options={hash:{
    'inFlight': ("inFlight"),
    'videos': ("data.videoData")
  },hashTypes:{'inFlight': "ID",'videos': "ID"},hashContexts:{'inFlight': depth0,'videos': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createVideoForm", options))));
  data.buffer.push("\r\n    </div>   \r\n\r\n\r\n    <div class=\"form-group tile-12x1\">\r\n    <label> Videos to Add </label>\r\n       ");
  data.buffer.push(escapeExpression((helper = helpers['fc-videoSummary'] || (depth0 && depth0['fc-videoSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'videos': ("data.videoData")
  },hashTypes:{'inFlight': "ID",'videos': "ID"},hashContexts:{'inFlight': depth0,'videos': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-videoSummary", options))));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class = \"form-group tile-12x1\">\r\n      <button class=\"btn btn-default\"\r\n        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n        Submit\r\n      </button> \r\n    </div>\r\n    \r\n  </div>\r\n</form> \r\n");
  return buffer;
  
});

Ember.TEMPLATES["_matchdetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("details yo");
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-details"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n  ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "matchcreation", options) : helperMissing.call(depth0, "partial", "matchcreation", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n  ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "matchdetails", options) : helperMissing.call(depth0, "partial", "matchdetails", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "createFlag", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["components/fc-admin-matches"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n  <div class = \"tile-10x1\"> ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div>\r\n");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "matches", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-subheader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"subheader\">      \r\n  <div class = \"container\">\r\n      <ul class=\"nav navbar-nav navbar-left\">\r\n        <p class=\"navbar-text navbar-left\">Create: </p>\r\n        <li class=\"dropdown\">\r\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Person<b class=\"caret\"></b></a>\r\n          <ul class=\"dropdown-menu\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "createPerson", options) : helperMissing.call(depth0, "partial", "createPerson", options))));
  data.buffer.push("\r\n          </ul>\r\n        </li>                \r\n        <li class=\"dropdown\">\r\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Event<b class=\"caret\"></b></a>\r\n          <ul class=\"dropdown-menu\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "createEvent", options) : helperMissing.call(depth0, "partial", "createEvent", options))));
  data.buffer.push("\r\n          </ul>\r\n        </li>         \r\n      </ul> \r\n  </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createFighterForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("  <div class = \"form-group tile-4x1\">\r\n   ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Person"),
    'content': ("people"),
    'selection': ("newFighter.person"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n  </div>\r\n  <div class = \"form-group tile-4x1\">\r\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'multiple': ("true"),
    'prompt': ("Select a character"),
    'content': ("characters"),
    'selection': ("newFighter.characters"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'multiple': "STRING",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'multiple': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \r\n  </div>\r\n<div class = \"form-group tile-1x1\">\r\n  <button class=\"btn btn-default\" \r\n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createFighter", "newFighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n    Add \r\n  </button>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createVideoForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"form-group tile-5x1\">\r\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("newVideo.url"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n</div>\r\n\r\n<div class=\"form-group tile-5x1\">\r\n  <button class=\"btn btn-default\" \r\n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addVideo", "newVideo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n    Add \r\n  </button>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-fighterSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n  <li class = \"tile-5x1\">\r\n    <span>\r\n    ");
  stack1 = helpers._triageMustache.call(depth0, "fighter.person.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  stack1 = helpers.each.call(depth0, "character", "in", "fighter.characters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </span>\r\n\r\n    <button class=\"btn btn-danger btn-xs\" \r\n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteFighter", "fighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n    Remove\r\n    </button>\r\n  </li>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n      ");
  stack1 = helpers._triageMustache.call(depth0, "character.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "fighter", "in", "fighters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-videoSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n  <span>\r\n    ");
  stack1 = helpers._triageMustache.call(depth0, "video.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  stack1 = helpers._triageMustache.call(depth0, "video.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n  </span>\r\n  <button class=\"btn btn-danger btn-xs\"\r\n  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeVideo", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n    Remove\r\n  </button>\r\n");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "video", "in", "videos", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["matchdetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("MATCH DETAILS");
  
});

Ember.TEMPLATES["matches"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  stack1 = helpers._triageMustache.call(depth0, "fc-admin-subheader", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<div class = \"tile-8x2\">\r\n</div>\r\n<div class = \"tile-10x8\">\r\n  ");
  stack1 = helpers._triageMustache.call(depth0, "fc-admin-matches", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \r\n</div>\r\n\r\n<div class = \"tile-region-10\">\r\n");
  data.buffer.push(escapeExpression((helper = helpers['fc-admin-details'] || (depth0 && depth0['fc-admin-details']),options={hash:{
    'createFlag': ("createFlag")
  },hashTypes:{'createFlag': "ID"},hashContexts:{'createFlag': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-admin-details", options))));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});