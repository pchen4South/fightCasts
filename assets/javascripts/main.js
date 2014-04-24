(function (window, undefined) {
  var introButton = $("#intro");
  var signupUri = "/api/v1/signup";
  var loginUri = "/api/v1/login";
  var logoutUri = "/api/v1/logout";
  var resetPwUri = "/api/v1/resetPassword";
  var changePwUri = "/api/v1/changePassword"
  var tour = introJs();
  var userForm = $("#userForm");
  var changePwForm = $("#changePasswordForm");
  var signupBtn = $("#signup");
  var loginBtn = $("#login");
  var logoutBtn = $("#logout");
  var forgotPwBtn = $("#forgotPassword");

  //helper that resets input field values for a form
  var resetForm = function (form) {
    form.find("input").val("");
  };

  //return a form as json
  var formToJson = function (form) {
    var inputs = form.find("input");
    var results = {};

    $.each(inputs, function (index, input) {
      var name = $(input).attr("name");
      var value = $(input).val();

      results[name] = value;
    });
    return results;
  };

  //used to communicate the result of actions to the user on form submissions
  var displayMessage = function (message) {
    alert(message); 
  };

  //we do basic sanity checking, then send ajax request and show results
  var signup = function (form) {
    var newUserData = formToJson(form);

    if (!newUserData.email) return displayMessage("You must provide an email"); 
    if (!newUserData.password) return displayMessage("You must provide a password"); 

    $.post(signupUri, newUserData)
    .then(function (res) {
      location.reload();
    })
    .fail(function (err) {
      displayMessage(err.responseText); 
    });
  };

  //we do basic sanity checking, then send ajax request and show results
  var login = function (form) {
    var newUserData = formToJson(form);

    if (!newUserData.email) return displayMessage("You must provide an email"); 
    if (!newUserData.password) return displayMessage("You must provide a password"); 

    $.post(loginUri, newUserData)
    .then(function (res) {
      location.reload();
    })
    .fail(function (err) {
      displayMessage(err.responseText); 
    });
  };

  var logout = function (form) {
    $.post(logoutUri)
    .then(function (res) {
      location.reload(); 
    })
    .fail(function (err) {
      displayMessage(err.responseText); 
    });
  };

  var changePassword = function (form) {
    var userData = formToJson(form);

    if (!userData.email) return displayMessage("You must provide an email"); 
    if (!userData.password) return displayMessage("You must provide a password"); 
    if (!userData.newPassword) return displayMessage("You must provide a new password"); 

    $.post(changePwUri, userData)
    .then(function (res) {
      displayMessage("You changed your password!");
      resetForm(form);
    })
    .fail(function (err) {
      displayMessage(err.responseText); 
    });
  };

  var forgotPassword = function (form) {
    var userData = formToJson(form);

    if (!userData.email) return displayMessage("You must provide an email"); 

    $.post(resetPwUri, userData)
    .then(function (res) {
      displayMessage("A temporary password has been emailed to you!");
      resetForm(form);
    })
    .fail(function (err) {
      displayMessage(err.responseText); 
    });
  };

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
      }
    ] 
  });

  introButton.click(function (e) {
    e.preventDefault();
    tour.start();
  });

  //we don't want standard form submission for this
  userForm.submit(function (e) {
    e.preventDefault(); 
    console.log("blocked");
  });

  changePwForm.submit(function (e) {
    e.preventDefault(); 
    changePassword(changePwForm);
  });

  loginBtn.click(function (e) {
    e.preventDefault(); 
    login(userForm);
  });

  logoutBtn.click(function (e) {
    e.preventDefault(); 
    logout(userForm);
  });

  signupBtn.click(function (e) {
    e.preventDefault(); 
    signup(userForm);
  });

  forgotPwBtn.click(function (e) {
    e.preventDefault(); 
    forgotPassword(userForm);
  });

})(window);
