(function (window, undefined) {
  var backBtns = $(".back-button");

  backBtns.click(function (e) {
    e.preventDefault(); 
    window.history.go(-1);
  });

})(window);
