var express = require('express');
var exphbs = require('express3-handlebars');
var ejs = require('ejs');
var app = express();
var mongoose = require('mongoose');
var gameIcon = require('./views/helpers/gameIcon');

mongoose.connect('mongodb://localhost:27017/fightCasts');

var hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {gameIcon: gameIcon}  
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

app.listen(3000);
