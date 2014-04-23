//libs
var express = require('express');
var passport = require('passport');
var exphbs = require('express3-handlebars');
var mongoose = require('mongoose');
var moment = require('moment');
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');

//handlebars helpers
var gameIcon = require('./views/helpers/gameIcon');
var countryIcon = require('./views/helpers/countryIcon');
var ytUrl = require('./views/helpers/ytUrl');
var prettyDate = require('./views/helpers/prettyDate');

//templates
var emailTemplates = require('./services/email/templates')(handlebars);

//services
var logger = require('./services/log/console');

//config
var config = require('./config.json');
var mailconfig = config.services.email;
var mongoUri = config.services.db.uri;

//configure services
var mailer = nodemailer.createTransport("SMTP", {
  service: mailconfig.service,
  auth: {
    user: mailconfig.user,
    pass: mailconfig.pass 
  }
});
var hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
    gameIcon: gameIcon, 
    countryIcon: countryIcon,
    ytUrl: ytUrl,
    prettyDate: prettyDate
  }  
});

//RECURRING JOBS
var indexMatches = require("./jobs/index-search").indexMatches;
var everySecond = 1000;
var everyMinute = everySecond * 60;
var everyHour = everyMinute * 60;
var everyDay = everyHour * 24;
var everyWeek = everyDay * 7;

//optionally accepts callback
indexMatches({logger: logger});

setInterval(function () {
  indexMatches({logger: logger});
}, everyHour);
//END RECURRING JOBS

//APP SETUP
var app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.set("mailer", mailer);
app.set("emails", emailTemplates);
app.engine("handlebars", hbs.engine);
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'kara knee' }));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());
//END APP SETUP

//CONFIGURE ROUTES
require('./routes/api')(app);
require('./routes/admin')(app);
require('./routes/frontend')(app);
//END CONFIGURE ROUTES

mongoose.connect(mongoUri);
app.listen(process.env.PORT || 3000);
