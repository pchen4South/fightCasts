var player = require('./models/playerModel')['model'];
var character = require('./models/characterModel')['model'];

abc = player.create({name: "pete"}, function(err, res){
  console.log(res);
});

player.create({name: "sid"});
player.create({name: "steve"});

character.create({name: "akuma"});
character.create({name: "cammy"});