Ember.TEMPLATES["_createEvent"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminSubmitForm\">\n  <form role=\"form\">  \n    <div class=\"form-group\">\n      <label for=\"name\">Name</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'class': ("form-control"),
    'value': ("data.name"),
    'placeholder': ("Event Name")
  },hashTypes:{'type': "STRING",'disabled': "ID",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div> \n    <button class=\"btn btn-info\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", "event", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","STRING"],data:data})));
  data.buffer.push(">\n      create!\n    </button> \n  </form> \n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_createFighter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminFormWrapper\">\n  <form role=\"form\">\n    <div class=\"form-group\">\n      <label for=\"person\">Player</label>\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select a person"),
    'content': ("people"),
    'selection': ("data.name"),
    'optionValuePath': ("content.name"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \n\n      <label for=\"characters\">Character</label>\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select a character"),
    'content': ("characters"),
    'selection': ("data.character"),
    'optionValuePath': ("content.name"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \n      \n    </div> \n     <button class=\"btn btn-info\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", "fighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","STRING"],data:data})));
  data.buffer.push(">\n      create!\n    </button> \n  </form> \n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_createPerson"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminSubmitForm\">\n  <form role=\"form\">\n    <div class=\"form-group\">\n      <label for=\"name\">Name</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'class': ("form-control"),
    'value': ("data.name"),
    'placeholder': ("name")
  },hashTypes:{'type': "STRING",'disabled': "ID",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n      <label for=\"name\">Country</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'class': ("form-control"),
    'value': ("data.country"),
    'placeholder': ("2 letter country code")
  },hashTypes:{'type': "STRING",'disabled': "ID",'class': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'class': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div> \n    <button class=\"btn btn-info\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", "person", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","STRING"],data:data})));
  data.buffer.push(">\n      create!\n    </button> \n  </form> \n</div> ");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-create"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<form role=\"form\">\n  <div class=\"form-group\">\n    <label>Create a Match</label>\n    \n    <div class=\"form-group tile-10x1\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.title"),
    'class': ("form-control"),
    'placeholder': ("Match Title")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n      <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    </div>\n    \n    <div class=\"form-group tile-10x1\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("data.description"),
    'class': ("form-control"),
    'placeholder': ("Description")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n    \n    <div class=\"form-group tile-4x1\">\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select game"),
    'content': ("games"),
    'selection': ("data.game"),
    'optionLabelPath': ("content"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n      <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.game", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    </div>\n    \n      <div class=\"form-group tile-12x3\"> \n        <label> Fighters </label>\n        ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createFighterForm'] || (depth0 && depth0['fc-createFighterForm']),options={hash:{
    'inFlight': ("inFlight"),
    'characters': ("characters"),
    'fighter': ("data.fighters"),
    'people': ("people")
  },hashTypes:{'inFlight': "ID",'characters': "ID",'fighter': "ID",'people': "ID"},hashContexts:{'inFlight': depth0,'characters': depth0,'fighter': depth0,'people': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createFighterForm", options))));
  data.buffer.push("\n        <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.fighterOne", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    </div> \n    \n    <div class=\"form-group tile-12x2\"> \n      <label> Players to Add: </label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers['fc-fighterSummary'] || (depth0 && depth0['fc-fighterSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'fighters': ("data.fighters")
  },hashTypes:{'inFlight': "ID",'fighters': "ID"},hashContexts:{'inFlight': depth0,'fighters': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-fighterSummary", options))));
  data.buffer.push("\n    </div>\n    <div class=\"form-group tile-4x1\">\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Category"),
    'content': ("categories"),
    'selection': ("data.category"),
    'optionLabelPath': ("content"),
    'optionValuePath': ("content"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n      <span class=\"help-block\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.game", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    </div>\n    \n    <div class=\"form-group tile-5x3\">\n      <label for=\"casters\">Casters</label>\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Casters"),
    'multiple': (true),
    'content': ("people"),
    'selection': ("data.casters"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'multiple': "BOOLEAN",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'multiple': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n\n    \n    <div class=\"form-group tile-5x1\">\n      <label>Event Name</label> \n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Event"),
    'content': ("events"),
    'selection': ("data.event"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n    \n    \n    <div class=\"form-group tile-5x1\">\n      <label for=\"playedAt\">Date Played</label>\n       ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("date"),
    'disabled': ("inFlight"),
    'value': ("data.playedAt"),
    'class': ("form-control")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n\n    <div class=\"form-group tile-12x1\">\n       ");
  data.buffer.push(escapeExpression((helper = helpers['fc-createVideoForm'] || (depth0 && depth0['fc-createVideoForm']),options={hash:{
    'inFlight': ("inFlight"),
    'videos': ("data.videoData")
  },hashTypes:{'inFlight': "ID",'videos': "ID"},hashContexts:{'inFlight': depth0,'videos': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-createVideoForm", options))));
  data.buffer.push("\n    </div>   \n\n\n    <div class=\"form-group tile-12x1\">\n    <label> Videos to Add </label>\n       ");
  data.buffer.push(escapeExpression((helper = helpers['fc-videoSummary'] || (depth0 && depth0['fc-videoSummary']),options={hash:{
    'inFlight': ("inFlight"),
    'videos': ("data.videoData")
  },hashTypes:{'inFlight': "ID",'videos': "ID"},hashContexts:{'inFlight': depth0,'videos': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-videoSummary", options))));
  data.buffer.push("\n    </div>\n\n    <div class = \"form-group tile-12x1\">\n      <button class=\"btn btn-default\"\n        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSubmit", "data", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n        Submit\n      </button> \n    </div>\n    \n  </div>\n</form> \n\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-details"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression((helper = helpers.prettyDate || (depth0 && depth0.prettyDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "match.featuredAt", options) : helperMissing.call(depth0, "prettyDate", "match.featuredAt", options))));
  data.buffer.push("\n      ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n        Not Featured\n      ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \n      <div class = \"adminListItem\"> ");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div>\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \n      <div class = \"adminListItem\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div>\n    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" \n    <div class = \"adminListItem\"> \n    ");
  stack1 = helpers._triageMustache.call(depth0, "person.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n      ");
  stack1 = helpers.each.call(depth0, "characters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n    ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <i>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </i>\n      ");
  return buffer;
  }

  data.buffer.push("<div class = \"matchDetailHeader\"> Match Details for <label> ");
  stack1 = helpers._triageMustache.call(depth0, "match.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </label></div>\n<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "makeFeatured", "match", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class = \"btn btn-xs btn-default\">Make Featured </button>\n<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteMatch", "match", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class = \"btn btn-xs btn-default\">Delete</button>\n<ul>\n  <li>\n    <label> Description:</label>  \n    <div class = \"adminListItem\">");
  stack1 = helpers._triageMustache.call(depth0, "match.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n  </li>\n  <li>\n    <label> Category:</label>\n    <div class = \"adminListItem\">");
  stack1 = helpers._triageMustache.call(depth0, "match.category", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n  </li>\n  <li>\n    <label> Date Played:</label> \n    <div class = \"adminListItem\"> ");
  data.buffer.push(escapeExpression((helper = helpers.prettyDate || (depth0 && depth0.prettyDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "match.playedAt", options) : helperMissing.call(depth0, "prettyDate", "match.playedAt", options))));
  data.buffer.push(" </div>\n  </li>\n  <li>\n    <label> Featured At:</label>\n    <div class = \"adminListItem\">\n      ");
  stack1 = helpers['if'].call(depth0, "match.featuredAt", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n  </li>\n  <li>\n    <label> Videos:</label> \n    ");
  stack1 = helpers.each.call(depth0, "match.videos", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </li>\n  <li>\n    <label> Casters: </label>\n    ");
  stack1 = helpers.each.call(depth0, "match.casters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </li>\n  <li>\n    <label> Fighters: </label>\n    ");
  stack1 = helpers.each.call(depth0, "match.fighters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </li>\n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-matches"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("tile-8x1 adminMatchList")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "matches.match", "match._id", options) : helperMissing.call(depth0, "link-to", "matches.match", "match._id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers._triageMustache.call(depth0, "match.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "match", "in", "matches", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-subheader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Admin Home");
  }

  data.buffer.push("<div id=\"subheader\">      \n  <div class = \"container\">\n      <ul class=\"nav navbar-nav navbar-left\">\n        <li class=\"navbar-left adminlink\">\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </li>\n        <p class=\"navbar-text navbar-left\">Create: </p>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Person<b class=\"caret\"></b></a>\n          <ul class=\"dropdown-menu\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "createPerson", options) : helperMissing.call(depth0, "partial", "createPerson", options))));
  data.buffer.push("\n          </ul>\n        </li>                \n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Event<b class=\"caret\"></b></a>\n          <ul class=\"dropdown-menu\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "createEvent", options) : helperMissing.call(depth0, "partial", "createEvent", options))));
  data.buffer.push("\n          </ul>\n        </li>         \n      </ul> \n  </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createFighterForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("  <div class = \"form-group tile-4x1\">\n   ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'prompt': ("Select Person"),
    'content': ("people"),
    'selection': ("newFighter.person"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n  </div>\n  <div class = \"form-group tile-4x1\">\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'disabled': ("inFlight"),
    'multiple': ("true"),
    'prompt': ("Select a character"),
    'content': ("characters"),
    'selection': ("newFighter.characters"),
    'optionLabelPath': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'disabled': "ID",'multiple': "STRING",'prompt': "STRING",'content': "ID",'selection': "ID",'optionLabelPath': "STRING",'class': "STRING"},hashContexts:{'disabled': depth0,'multiple': depth0,'prompt': depth0,'content': depth0,'selection': depth0,'optionLabelPath': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" \n  </div>\n<div class = \"form-group tile-1x1\">\n  <button class=\"btn btn-default\" \n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createFighter", "newFighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Add \n  </button>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-createVideoForm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"form-group tile-5x1\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'disabled': ("inFlight"),
    'value': ("newVideo.url"),
    'class': ("form-control"),
    'placeholder': ("Video URL")
  },hashTypes:{'type': "STRING",'disabled': "ID",'value': "ID",'class': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'disabled': depth0,'value': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n</div>\n\n<div class=\"form-group tile-5x1\">\n  <button class=\"btn btn-default\" \n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addVideo", "newVideo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Add \n  </button>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-fighterSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <li class = \"tile-5x1\">\n    <span>\n    ");
  stack1 = helpers._triageMustache.call(depth0, "fighter.person.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "character", "in", "fighter.characters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </span>\n\n    <button class=\"btn btn-danger btn-xs\" \n    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteFighter", "fighter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Remove\n    </button>\n  </li>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      ");
  stack1 = helpers._triageMustache.call(depth0, "character.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "fighter", "in", "fighters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-videoSummary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <span>\n    ");
  stack1 = helpers._triageMustache.call(depth0, "video.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers._triageMustache.call(depth0, "video.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </span>\n  <button class=\"btn btn-danger btn-xs\"\n  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("inFlight")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeVideo", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    Remove\n  </button>\n");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "video", "in", "videos", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["match"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("  ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "matchdetails", options) : helperMissing.call(depth0, "partial", "matchdetails", options))));
  return buffer;
  
});

Ember.TEMPLATES["matches"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression((helper = helpers['fc-admin-create'] || (depth0 && depth0['fc-admin-create']),options={hash:{
    'matches': ("matches"),
    'people': ("people"),
    'events': ("events"),
    'characters': ("characters")
  },hashTypes:{'matches': "ID",'people': "ID",'events': "ID",'characters': "ID"},hashContexts:{'matches': depth0,'people': depth0,'events': depth0,'characters': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-admin-create", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression((helper = helpers['fc-admin-details'] || (depth0 && depth0['fc-admin-details']),options={hash:{
    'match': ("controller.match"),
    'action': ("deleted"),
    'matchDeleted': ("matchDeleted"),
    'matches': ("matches")
  },hashTypes:{'match': "ID",'action': "STRING",'matchDeleted': "ID",'matches': "ID"},hashContexts:{'match': depth0,'action': depth0,'matchDeleted': depth0,'matches': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-admin-details", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push(escapeExpression((helper = helpers['fc-admin-subheader'] || (depth0 && depth0['fc-admin-subheader']),options={hash:{
    'action': ("updateInfo")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-admin-subheader", options))));
  data.buffer.push("\n\n<div class = \"adminWrapper\">\n<div class = \"tile-8x2\">\n</div>\n<div class = \"tile-10x8\">\n  ");
  data.buffer.push(escapeExpression((helper = helpers['fc-admin-matches'] || (depth0 && depth0['fc-admin-matches']),options={hash:{
    'matches': ("matches")
  },hashTypes:{'matches': "ID"},hashContexts:{'matches': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "fc-admin-matches", options))));
  data.buffer.push(" \n</div>\n\n<div class = \"tile-region-11 adminFormWrapper\">\n");
  stack1 = helpers['if'].call(depth0, "masterView", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n</div>");
  return buffer;
  
});