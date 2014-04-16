(function (window, undefined) {
  var introButton = $("#intro");
  var contactForm = $("#contactForm");
  var contactFormMessage = contactForm.children(".message").first();
  var searchForm = $("#searchForm");
  var searchInput = $("#searchInput");
  var emailInput = $("#emailInput");
  var contactUri = "/api/v1/contacts/";
  var tour = introJs();

  tour.setOptions({
    //showStepNumbers: false,
    scrollToElement: false,
    tooltipClass: "tool-tip",
    steps: [
      {
        element: "#featuredPro",
        intro: "Top pro matches are featured here.  You can even view them directly in the tile.",
        position: "right"
      },
      {
        element: "#featuredCommunity",
        intro: "Top community matches are featured here.  Again, the match may be viewed in the tile itself.",
        position: "left"
      },
      {
        element: "#proList",
        intro: "The latest pro matches are always available in this list.",
        position: "right"
      },
      {
        element: "#communityList",
        intro: "The latest community matches are always available in this list.",
        position: "left"
      },
      {
        element: "#focusedContent",
        intro: "The currently focused match is found here.  Match details, comments, etc are available below.",
        position: "bottom"
      },
      {
        element: "#gameSelect",
        intro: "Select your game of interest here.",
        position: "right"
      },
      {
        element: "#searchBar",
        intro: "Typing in search terms will filter the lists and remove featured tiles.",
        position: "right"
      },
      {
        element: "#emailInput",
        intro: "Signup for our mailing list to keep up-to-date with announcements and new featured.",
        position: "bottom"
      },
    ] 
  });

  introButton.click(function (e) {
    e.preventDefault();
    tour.start();
  });

  var submitContact = function (email) {
    $.post(contactUri, {email: email})
    .then(function (results) {
      var successText = "Thanks for signing up, " + results.contact.email;

      contactFormMessage.text(successText);
      emailInput.val("");
    })
    .fail(function (err) {
      var failureText = err.message ? err.message : "Something went wrong...";

      contactFormMessage.text(failureText);
      emailInput.val("");
    })
  };

  contactForm.submit(function (e) {
    e.preventDefault(); 
    var email = emailInput.val();
    submitContact(email)
  });

  searchForm.submit(function (e) {
    e.preventDefault(); 
    var search = searchInput.val();
    var url = "/matches/search/?search=" + search;

    window.location.href = url;
  });

})(window);
