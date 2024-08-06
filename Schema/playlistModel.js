const mongoose = require("mongoose");

//Create Schema
const playlistDataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
        },
        songs: {
            type: [String],

        },

        date: {
            type: String,
            required: true,
        },
        forked: {
            type: Number,
        },
        language:{
            type:String,
        },
        type:{
            type:[String],
        }

    },
    { timestamps: true }
);

//Create Model
const playlistData = mongoose.model("PlaylistData", playlistDataSchema);

module.exports = playlistData;