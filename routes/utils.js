var createQuery = function (params) {
  var gameQuery = "SF4";
  var searchString = new RegExp(params.search, "i");

  return {
    //not currently used, will add in soon
    //game: gameQuery,
    title: {"$regex": searchString}
  };
};

module.exports.createQuery = createQuery;
