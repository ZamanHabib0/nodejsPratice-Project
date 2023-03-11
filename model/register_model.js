const mongoose = require('mongoose')



const authSchema = mongoose.Schema(
    {
    name : String,
    email : String,
    password : String,
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
    jwtToken : String,
    confirmationCode: { 
        type: String, 
        unique: true },
}
);

module.exports = mongoose.model("registerData" , authSchema)