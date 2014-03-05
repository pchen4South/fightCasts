var express = require('express');
var fs = require('fs');
var testdata = __dirname + '/data.json';

var app = express();
//var replay = require('./models/replayModel');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

console.log('Listening on port 3000');
app.listen(3000);


app.get('/', function(req, res){ 
  res.render('index');
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

