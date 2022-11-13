const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require("fs");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
);

function sendEmail() {
  const mailOptions = {
    from: process.env.MAIL,
    to: process.env.RECEIVER,
    subject: "Тестовое письмо",
    html: fs.readFileSync("mail.html", "utf8").toString(),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
}

sendEmail();
