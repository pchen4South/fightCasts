var createQuery = function (params) {
  var gameQuery = "SF4";
  var searchString = new RegExp(params.search, "i");

  return {
    //not currently used, will add in soon
    //game: gameQuery,
    title: {"$regex": searchString}
  };
};

var createHistoricalQuery = function(params){
  var timeFrame = params.search;
  var monQuery = {};
  var now = new Date();
  
  switch(timeFrame){
    case "previous week": 
      monQuery = {"playedAt": 
        {"$gte": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), 
        "$lt": now}};
      break;    
    case "previous month": 
      monQuery = {"playedAt": 
        {"$gte": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30), 
        "$lt": now}};
      break;    
      
    case "previous year": 
      monQuery = {"playedAt": 
        {"$gte": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 365), 
        "$lt": now}};
      break;
  }
  return monQuery;
};


module.exports.createQuery = createQuery;
module.exports.createHistoricalQuery = createHistoricalQuery;
