const authModel = require('../model/register_model.js');
const nodemailer = require("../config/nodemailer_config.js");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config()





const userRegister = async (req,res) => {
    try{
        const { name, email, password } = req.body;

        const oldUser = await authModel.findOne({ email });
 
      if (oldUser) {
        return res.send("User Already Exist. Please Login");
      }

    encryptedPassword = await bcrypt.hash(password, 10);

        const userData = await authModel.create({
          firstname : name,
            email : email.toLowerCase(),
            password : encryptedPassword,
            jwtToken : ""
         });

        //  tokensender()

         const jwtToken = jwt.sign(
          { user_id: userData._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          
           } );

        const confirmationCode = jwt.sign({email: email}, process.env.secret_Key);

        userData.confirmationCode = confirmationCode;
        userData.jwtToken = jwtToken;

        const dataToSave = await userData.save();
        res.status(200).json(userData)
        console.log(dataToSave);


     nodemailer.sendConfirmationEmail(
        name,
        email,
        confirmationCode
 );

}
catch(error){
console.log(error)
}
} 

 const userLogin = async (req,res)=>{
    
    try {

        const { email, password } = req.body;
  
        const user = await authModel.findOne({ email });
  
        if (user.status != "Active") {
          return res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
          });
        }
    
        if (email && (await bcrypt.compare(password, user.password))) {
  
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
  
          user.jwtToken = token;
  
          res.status(200).json(user);
        }else{
          res.send("Wrong Credentials");
        }
  
      } catch (err) {
        console.log(err);
      }
  
 }

 const verifyJwtToken = async (req,res)=> {
    const { confirmationCode } = req.params;


    authModel.findOne({
    confirmationCode: confirmationCode,
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      const dataToSave = await user.save();
      console.log(dataToSave)
      res.status(200).json(dataToSave)
    })
    .catch((e) => console.log("error", e));
}

const forgetPasswordTokenSending = async (req,res)=> {
    
  try {

    const { email } = req.body;

    const user = await authModel.findOne({ email });

    if (user) {

      const confirmationCode = Math.floor(100000 + Math.random() * 900000);

      user.confirmationCode = confirmationCode;

      nodemailer.sendforgetPasswordEmail(
        email,
        confirmationCode,
 );


      const dataToUpdate = await user.save();
      res.status(200).json(dataToUpdate);
    }else{
      res.send("Wrong Credentials");
    }

  } catch (err) {
    console.log(err);
  }

}

const forgetPasswordverfingcode = async ( req,res)=> {
      
  const { forgetpasswordcode } = req.params;
  const { password } = req.body;


    authModel.findOne({
    confirmationCode: forgetpasswordcode,
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "Code Invalid" });
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      user.password = encryptedPassword;
      user.confirmationCode = Math.floor(100000 + Math.random() * 900000)
      const dataToSave = await user.save();
      console.log(dataToSave)
      res.status(200).json(dataToSave)
    })
    .catch((e) => console.log("error", e));
}






module.exports = {
    userRegister,
    userLogin,
    verifyJwtToken,
    forgetPasswordTokenSending,
    forgetPasswordverfingcode
}