var express = require('express');
var engines = require('consolidate');
var app = express();
var data = require('./data')

app.set("views", __dirname + "/views");
app.engine(".handlebars", engines.handlebars);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());
app.use(express.urlencoded());
app.use(express.json());

app.get("/", function (req, res) {
  res.render("index", data); 
});

app.listen(3000);
console.log('Listening on port 3000');
