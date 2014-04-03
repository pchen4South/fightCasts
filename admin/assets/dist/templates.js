Ember.TEMPLATES["_createEvent"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class = \"adminFormWrapper\">\r\n  <form role=\"form\">\r\n    <h3>Create Event</h3>\r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Name</label>\r\n      ");
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

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["components/fc-admin-matches"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n  ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<br>\r\n");
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


  data.buffer.push("<div id=\"subheader\">\r\n   <div class=\"container\">\r\n    <div class=\"page-subheader\">\r\n      <div class=\"tab-wrapper\">\r\n      \r\n      <div class = \"container inner\">\r\n      <ul class=\"nav navbar-nav navbar-left\">\r\n        <p class=\"navbar-text navbar-left\">Create: </p>\r\n        <li class=\"dropdown\">\r\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Person<b class=\"caret\"></b></a>\r\n          <ul class=\"dropdown-menu\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "createPerson", options) : helperMissing.call(depth0, "partial", "createPerson", options))));
  data.buffer.push("\r\n          </ul>\r\n        </li>             \r\n        \r\n        <li class=\"dropdown\">\r\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Event<b class=\"caret\"></b></a>\r\n          <ul class=\"dropdown-menu\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "createEvent", options) : helperMissing.call(depth0, "partial", "createEvent", options))));
  data.buffer.push("\r\n          </ul>\r\n        </li>         \r\n      \r\n      </ul>\r\n    </div>\r\n  \r\n      \r\n      </div>\r\n    </div>\r\n  </div> \r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["matchcreation"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("MATCH CREATION");
  
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
  data.buffer.push("\r\n\r\n<div class = \"tile-8x2\">\r\n");
  stack1 = helpers._triageMustache.call(depth0, "fc-admin-matches", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n\r\n<div class = \"tile-8x2\">\r\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "detail", options) : helperMissing.call(depth0, "outlet", "detail", options))));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});