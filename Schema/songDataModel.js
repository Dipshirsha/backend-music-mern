const mongoose = require("mongoose");

//Create Schema
const songDataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        artistName: {
            type: String,
           
        },
        imgUrl: {
          type: String,
          required:true,
        },
        audioUrl:{
            type: String,
            required:true,
        },
        likes:{
            type:Number,
            required: true,
        },
        artistId:{
            type:String,
          
        },
        albumName:{
            type:String,
         
        },
        albumId:{
            type:String,
          
        },
        language:{
            type:String,
            required: true,
        },
        date:{
            type:String,
          
        },
        type:{
            type:[String],
            required: true,
          
        },
        plays:{
            type:Number,
          
        },

    },
    { timestamps: true }
);

//Create Model
const songData = mongoose.model("SongData", songDataSchema);

module.exports = songData;