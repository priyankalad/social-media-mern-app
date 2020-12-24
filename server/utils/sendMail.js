var nodemailer = require("nodemailer");
const config = require("../config.json");

var transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

var sendMail = function (options, callback) {
  transporter.sendMail(options, (err, info) => {
    if (err) {
      return callback(err, "");
    }
    callback(null, info);
  });
};
module.exports = sendMail;
