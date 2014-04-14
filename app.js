var express = require('express');
var passport = require('passport');
var exphbs = require('express3-handlebars');
var app = express();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var gameIcon = require('./views/helpers/gameIcon');
var countryIcon = require('./views/helpers/countryIcon');
var ytUrl = require('./views/helpers/ytUrl');
var prettyDate = require('./views/helpers/prettyDate');
var emailTemplates = require('./services/email/templates')(handlebars);
var mailconfig = require("./config.json").services.email;
var mongoUri = require("./config.json").services.db.uri;
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

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.set("mailer", mailer);
app.set("emails", emailTemplates);
app.engine("handlebars", hbs.engine);
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'kara knee' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname));
app.use(express.methodOverride());

require('./routes/api')(app);
require('./routes/admin')(app);
require('./routes/frontend')(app);

mongoose.connect(mongoUri);
app.listen(process.env.PORT || 3000);
