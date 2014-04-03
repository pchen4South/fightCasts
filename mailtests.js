var nodemailer = require("nodemailer");
var mailconfig = require("./config.json").services.email;
var subject = "kanesteven@gmail.com";

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: mailconfig.service,
  auth: {
    user: mailconfig.user,
    pass: mailconfig.pass
  }
});

var mailOptions = {
  from: mailconfig.user,
  to: subject,
  subject: "Yo this is fantastic baby",
  text: "Bang!!!!"
};

smtpTransport.sendMail(mailOptions, function (err, res) {
  if (err) console.log(err);
  else console.log("message sent: ", res.message)
});
