var api = require('./api')
  , _ = require('lodash')
  , map = _.map
  , fighter = require('./models/fighterModel');

api.getMatchNested("5317ae17a1ebf547a411d789", function (err, res) {
  console.log(JSON.stringify(res, null, 4));
});
