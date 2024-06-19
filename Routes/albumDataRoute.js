const express = require("express");
const router = express.Router();
const albumData = require("../Schema/albumDataModel");


router.post("/addalbum", async (req, res) => {
    console.log(req.body);
    const { name, imgUrl, date } = req.body;
    console.log(imgUrl)
    try {
        const albumAdded = await albumData.create({
            name: name,
            imgUrl: imgUrl,
            
            followers: 0,
            songs:[],
            date:date,

        });
        res.status(201).json(albumAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});



router.get("/album", async (req, res) => {
    try {
      const allAlbum = await albumData.find();
      res.status(200).json(allAlbum);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});




router.post("/updatealbum", async (req, res) => {
    const { id,songs } = req.body;
  
    try {
      const singleAlbum = await albumData.findByIdAndUpdate( id,
       { songs:songs} );
      console.log(singleAlbum)
      res.status(200).json(singleAlbum);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });




module.exports = router;