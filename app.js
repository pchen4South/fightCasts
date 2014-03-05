var express = require('express');
var exphbs = require('express3-handlebars');
var app = express();

require('./routes/api')(app);
require('./routes/admin')(app);
require('./routes/frontend')(app);

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine(".handlebars", exphbs({defaultLayout: "main"}));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.methodOverride());

app.listen(3000);
