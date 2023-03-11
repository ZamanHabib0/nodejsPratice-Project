const express = require('express')

const addPlaceModel = require('../model/add_place_model.js');
const userProfileModel = require('../model/user_profile.js');
const nodemailer = require("../config/nodemailer_config.js");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const router = express.Router()
require('dotenv').config()
const userRegister = require('../controllers/user_controllers.js');






//register
router.post('/register', userRegister.userRegister)

//login
router.post("/login",  userRegister.userLogin);

// Verfing jwt Token
router.get("/auth/confirm/:confirmationCode", userRegister.verifyJwtToken);

// Forget Password token sending
router.post("/forgetPassword", userRegister.forgetPasswordTokenSending);

// Verfing ForgetPasword Token
router.get("/auth/forgetpassword/:forgetpasswordcode", userRegister.forgetPasswordverfingcode);

// Add Places
router.post("/admin/addplaces", async (req,res)=>{
   try{
  const { title , Uploaderusername , location , rating, price , about } = req.body;


  const oldTile = await addPlaceModel.findOne({ title });
 
      if (oldTile) {
        return res.send("Place Already Exist.");
      }
   
  const addplacedata = await addPlaceModel.create({
    title : title ,
    Uploaderusername : Uploaderusername,
    location : location,
    rating : rating,
    price : price,
    about : about,
 });

 const dataToSave = await addplacedata.save();
        res.status(200).json(dataToSave)
        console.log(dataToSave);

} catch(error){
  console.log(error)
  }
   
});

// User Profile
router.post("/editProfile", async (req,res)=>{
  try{
 const { firstName , LastName , Location , PhoneNumber} = req.body;
  
 const addplacedata = await userProfileModel.create({
  firstName : firstName ,
  LastName : LastName,
  Location : Location,
  PhoneNumber : PhoneNumber
});

const dataToSave = await addplacedata.save();
       res.status(200).json(dataToSave)
       console.log(dataToSave);

} catch(error){
 console.log(error)
 }
  
});

// Search places
router.get("/searchPlaces", async (req,res)=>{
//   try{
  // const { title } = req.body;
  const keyword = req.query.keyword
  const searchResult = await addPlaceModel.aggregate({
    
  $match : {title : keyword}

  

  

})


// .catch((e) => console.log("error", e));

console.log(searchResult)
  res.send(searchResult)



 
  
});







module.exports = router

