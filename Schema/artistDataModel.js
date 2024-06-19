const mongoose = require("mongoose");

//Create Schema
const artistDataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String, 
        },
        songs:{
            type:[String],
         
        },
        followers:{
            type:Number,
           
        },
        age:{
            type:Number,
            required: true,
        },
    date:{
        type:String,
        required:true,
    }

    },
    { timestamps: true }
);

//Create Model
const artistData = mongoose.model("ArtistData", artistDataSchema);

module.exports = artistData;