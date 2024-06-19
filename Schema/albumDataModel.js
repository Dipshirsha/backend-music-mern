const mongoose = require("mongoose");

//Create Schema
const albumDataSchema = new mongoose.Schema(
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
        
    date:{
        type:String,
        required:true,
    }

    },
    { timestamps: true }
);

//Create Model
const albumData = mongoose.model("AlbumData", albumDataSchema);

module.exports = albumData;