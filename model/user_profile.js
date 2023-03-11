const mongoose = require('mongoose')



const userprofile = mongoose.Schema(
    {
    firstName : String,
    LastName : String,
    Location : String,
    PhoneNumber : String
    
}
);

module.exports = mongoose.model("userProfile" , userprofile)