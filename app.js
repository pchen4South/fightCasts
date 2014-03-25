var express = require('express');
var exphbs = require('express3-handlebars');
var app = express();
var mongoose = require('mongoose');
var gameIcon = require('./views/helpers/gameIcon');
var countryIcon = require('./views/helpers/countryIcon');
var ytUrl = require('./views/helpers/ytUrl');
var passport = require('passport');

// DEV ADDR:
mongoose.connect('mongodb://localhost:27017/fightCasts');

//modulus ADDR:
//mongoose.connect('mongodb://admin:jibob682@novus.modulusmongo.net:27017/up5asOma');

//call to reset db on the modulus server (comment out the connect above);
// var reset = require('./databaseScripts/reset_reseed_db');
// reset(mongoose);

var hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
    gameIcon: gameIcon, 
    countryIcon: countryIcon,
    ytUrl: ytUrl
  }  
});

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'kara knee' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());

require('./routes/api')(app);
require('./routes/admin')(app);
require('./routes/frontend')(app);

app.listen(process.env.PORT || 3000);
