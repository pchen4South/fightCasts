var express = require('express');
var exphbs = require('express3-handlebars');
var app = express();
var mongoose = require('mongoose');
var gameIcon = require('./views/helpers/gameIcon');
var countryIcon = require('./views/helpers/countryIcon');
mongoose.connect('mongodb://localhost:27017/fightCasts'||
  'mongodb://admin:jibob682@mongo.onmodulus.net:27017/enyrO4ma'
);

var hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {gameIcon: gameIcon, 
            countryIcon: countryIcon}  
});

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());

require('./routes/api')(app);
require('./routes/admin')(app);
require('./routes/frontend')(app);

app.listen(process.env.PORT || 3000);
