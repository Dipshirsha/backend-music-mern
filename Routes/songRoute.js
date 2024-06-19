const express = require("express");
const router = express.Router();
const songData = require("../Schema/songDataModel");


router.post("/addsong", async (req, res) => {
    console.log(req.body);
    const { name, imgUrl, audioUrl, type,artistName,artistId,albumName,albumId,language,date } = req.body;
    try {
      const songAdded = await songData.create({
        name: name,
        imgUrl: imgUrl,
        audioUrl: audioUrl,
        type: type,
        artistName: artistName,
        artistId: artistId,
        albumId: albumId,
        albumName: albumName,
        likes: 0,
        language: language,
        date:date,
        plays:0,
        
      });
      res.status(201).json(songAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });


  router.get("/song", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
 
    try {
      const allSong = await songData.find();

      const limit = 30;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const resultItems = allSong.slice(startIndex, endIndex);
      res.status(200).json(resultItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post("/fetchplaylist", async (req, res) => {
  try {
    const {id} = req.body;
    const singleSong = await songData.findById(id);
    res.status(200).json(singleSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/addremovesonglike", async (req, res) => {
  const { id,likes } = req.body;

  try {
    const singleSong = await songData.findByIdAndUpdate( id,
     { likes:likes} );
    console.log(singleSong)
    res.status(200).json(singleSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/updateplays", async (req, res) => {
  const { id,plays } = req.body;

  try {
    const singleSong = await songData.findByIdAndUpdate( id,
     { plays:plays} );
    console.log(singleSong)
    res.status(200).json(singleSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/fetchhistory", async (req, res) => {
  try {
    const {id} = req.body;
    const singleSong = await songData.findById(id);
    res.status(200).json(singleSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/fetchliked", async (req, res) => {
  try {
    const {id} = req.body;
    const singleSong = await songData.findById(id);
    res.status(200).json(singleSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 router.post('/search', async (req, res) => {
  const { name } = req.body;
  try {
    const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
    const songs = await songData.find({ name: { $regex: regex } });
    const updateSong=songs.slice(0,5);
    console.log(updateSong)
    res.status(200).json(updateSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 



  module.exports = router;