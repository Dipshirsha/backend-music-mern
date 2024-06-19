const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const cors=require("cors");
app.use(cors());




const userDataRoute = require("./Routes/userDataRoute");
const songDataRoute=require("./Routes/songRoute")
const albumDataRoute=require("./Routes/albumDataRoute")
const artistDataRoute=require("./Routes/ArtistRoute")

app.use(express.json());

const userData = require("./Schema/userDataModel");
const songData = require("./Schema/songDataModel");
const artistData = require("./Schema/artistDataModel");
const albumData = require("./Schema/albumDataModel");



app.use( userDataRoute);
app.use(songDataRoute);
app.use(artistDataRoute);
app.use(albumDataRoute);


mongoose
  .connect("mongodb+srv://admin:admin@cluster0.oggtqg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port 5000`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));


