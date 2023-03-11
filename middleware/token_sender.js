"use strict";
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const verifyEmail =   async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  const token = jwt.sign({
    data: 'Token Data' 
}, 'ourSecretKey', { expiresIn: '10m' }
);	

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "zamanhabib08@gmail.com, zamanhabib777@gmail.com", // list of receivers
    subject: 'Email Verification',
    text: `Hi! There, You have recently visited
    our website and entered your email.
    Please follow the given link to verify your email
    http://localhost:3000/verify/${token}
    Thanks`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  main().catch(console.error);
}

module.exports = verifyEmail;

