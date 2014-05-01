(function (window, undefined) {
  var signupUri = "/api/v1/signup";
  var loginUri = "/api/v1/login";
  var logoutUri = "/api/v1/logout";
  var resetPwUri = "/api/v1/resetPassword";
  var changePwUri = "/api/v1/changePassword"
  var signupForm = $("#signupForm");
  var loginForm = $("#loginForm");
  var forgotPasswordForm = $("#forgotPasswordForm");
  var changePwForm = $("#changePasswordForm");
  var logoutBtn = $("#logout");
  var backBtns = $(".back-button");

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
      window.location.pathname = "/";
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
      window.location.pathname = "/";
    })
    .fail(function (err) {
      displayMessage(err.responseText); 
    });
  };

  var logout = function () {
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

  //we don't want standard form submission for this
  signupForm.submit(function (e) {
    e.preventDefault(); 
    signup(signupForm);
    console.log("signup attempted");
  });

  loginForm.submit(function (e) {
    e.preventDefault(); 
    login(loginForm);
    console.log("login attempted");
  });

  changePwForm.submit(function (e) {
    e.preventDefault(); 
    changePassword(changePwForm);
  });

  forgotPasswordForm.submit(function (e) {
    e.preventDefault(); 
    forgotPassword(forgotPasswordForm);
  });

  logoutBtn.click(function (e) {
    e.preventDefault(); 
    logout();
  });

  backBtns.click(function (e) {
    e.preventDefault(); 
    window.history.go(-1);
  });

})(window);
