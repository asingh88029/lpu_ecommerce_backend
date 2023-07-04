const nodemailer = require("nodemailer");
const config = require('./../config/config')

let mailTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.GMAIL_APP_USER,
    pass: config.GMAIL_APP_PASSWORD,
  },
});

async function sendEmail(to, subject, text) {
  const mailDetails = {
    from: "lpuecommercebackendmail@gmail.com",
    to,
    subject,
    text
  };

  mailTransport.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent Successfully to ", to);
    }
  });
}

module.exports = sendEmail;
