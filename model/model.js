const mongoose = require('mongoose')



const dataScheme = mongoose.Schema(
    {
        name: String,
        age : Number,
        class : String,
        Date: {
            type : Date,
            default : Date.now,
        }
    }
);

module.exports = mongoose.model("userdata", dataScheme);