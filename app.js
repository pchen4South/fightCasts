var express = require('express');
var exphbs = require('express3-handlebars');
var _ = require('lodash');
var find = _.find;
var app = express();
var matches = require('./matches')

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.engine(".handlebars", exphbs({defaultLayout: "main"}));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());
app.use(express.urlencoded());
app.use(express.json());

var returnIndex = function (req, res) {
  res.render("index", {matches: matches});
};

app.get("/", returnIndex);

app.get("/matches", returnIndex);

app.get('/matches/:id', function (req, res) {
  var id = Number(req.params.id)
    , match = find(matches, {id: id});

  res.render("match", match);
});

app.get('/testDB', function(req, res){
  res.send('biatch');
});

app.listen(3000);
