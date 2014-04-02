var introButton = document.getElementById("intro");
var tour = introJs();

tour.setOptions({
  showStepNumbers: false,
  scrollToElement: false,
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
      position: "bottom"
    },
  ] 
});

introButton.addEventListener("click", function (e) {
  e.preventDefault();
  tour.start();
});
