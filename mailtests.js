var nodemailer = require("nodemailer");
var mailconfig = require("./config.json").services.email;
var handlebars = require('handlebars');
var template = handlebars.compile("Please tell us your name, {{name}}");

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: mailconfig.service,
  auth: {
    user: mailconfig.user,
    pass: mailconfig.pass
  }
});

/*
 * scenario: we want to send a new user an email confirming their 
 * signup.  
 * obtain email transport
 * obtain user's email, obtain key identifying this user for confirmation
 * obtain newuser template function
 * render html output for email w/ template function and data
 * call email function w/ transport
* */

var trans = smtpTransport;
var user = {
  name: "Steve",
  email: "kanesteven@gmail.com"
};
var html = template(user);
var options = {
  to: user.email,
  subject: "Such wow, wow",
  html: html
};

trans.sendMail(options, function (err, res) {
  console.log(err);
  console.log(res.message);
});
