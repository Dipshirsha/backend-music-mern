const express = require("express");
const router = express.Router();
const artistData = require("../Schema/artistDataModel");


router.post("/addartist", async (req, res) => {
    console.log(req.body);
    const { name, imgUrl, age,date } = req.body;
    try {
        const artistAdded = await artistData.create({
            name: name,
            imgUrl: imgUrl,
            age: age,
            followers: 0,
            songs:[],
            date:date,

        });
        res.status(201).json(artistAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});







  router.get("/artist", async (req, res) => {
    try {
      const allArtist = await artistData.find();
      res.status(200).json(allArtist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});




router.post("/updateartist", async (req, res) => {
  const { id,songs } = req.body;

  try {
    const singleArtist = await artistData.findByIdAndUpdate( id,
     { songs:songs} );
    console.log(singleArtist)
    res.status(200).json(singleArtist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/updatefollowers", async (req, res) => {
  const { id,followers } = req.body;

  try {
    const singleArtist = await artistData.findByIdAndUpdate( id,
     { followers:followers} );
    console.log(singleArtist)
    res.status(200).json(singleArtist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post("/fetchfollower", async (req, res) => {
  try {
    const {id} = req.body;
    const singleArtist = await artistData.findById(id);
    res.status(200).json(singleArtist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;