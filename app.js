var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.methodOverride());
app.listen(3000);

app.get('/', function(req, res){
  res.render('index');
});
console.log('Listening on port 3000');