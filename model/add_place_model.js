const mongoose = require('mongoose')



const addPlaceModel = mongoose.Schema(
    {
    // backgroundImage : {
    //     type : Image,
    //     required : true,
    //     default : null
    // },
    title : {
        type : String,
        required : true,
        default : null
    },
    Uploaderusername : {
        type : String,
        required : true,
        default : null
    },
    location : String,
    // UploaderPic : Image,
    rating : Number,
    price : Number,
    about : String,
}
);

module.exports = mongoose.model("TourPlace" , addPlaceModel)