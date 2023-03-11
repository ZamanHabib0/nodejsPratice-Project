const nodemailer = require("nodemailer");
require('dotenv').config()


const user = process.env.user;
const pass = process.env.pass;

const transport = nodemailer.createTransport({
  service : "gmail",
 
  auth: {
    user: "zamanhabib777@gmail.com", // generated ethereal user
    pass: "qqdttlvfjleagwjw", // generated ethereal password
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };

  module.exports.sendforgetPasswordEmail = ( email, confirmationCode) => {
    console.log("Sending");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Forget Password",
      html: `<h1>Forget Password</h1>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/api/auth/forgetpassword/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };