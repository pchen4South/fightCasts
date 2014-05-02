(function (window, undefined) {
  var backBtns = $(".back-button");
  var videoPlayers = $(".video-player");

  $(document).ready(function () {
    videoPlayers.fitVids();
  });

  backBtns.click(function (e) {
    e.preventDefault(); 
    window.history.go(-1);
  });

})(window);
