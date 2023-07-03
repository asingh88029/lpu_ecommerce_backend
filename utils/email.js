const nodemailer = require("nodemailer");

let mailTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "yourgmail@gmail.com",
    pass: "useyourapppasswordgenerated",
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
