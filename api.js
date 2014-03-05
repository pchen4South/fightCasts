var player = require('./models/playerModel');

var createPlayer = function(req,res){
  console.log(req.body.name);
  //player['model'].create({});
  res.status(200).send();
}

module.exports = {'createPlayer': createPlayer}