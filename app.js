var express = require('express');
var engines = require('consolidate');
var fs = require('fs');
var testdata = __dirname + '/data.json';

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

app.get('matches', function(req, res){
  fs.readFile(testdata, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
    //data = JSON.parse(data);
    res.JSON(data);
  });
});

app.get('matches/:id');

app.get('/testDB', function(req, res){
  res.send('biatch');
});

