const express = require("express");
const router = express.Router();
const songData = require("../Schema/songDataModel");
const mongoose = require('mongoose');
const artistData = require("../Schema/artistDataModel");




async function fetchDocumentsByIds(ids,page) {
  try {
    // Convert string IDs to ObjectId if necessary
  

    // Fetch documents using the $in operator
    const skip = (page - 1) * 5;
    
    // Fetch documents using the $in operator with pagination
    const documents = await songData.find({ _id: { $in: ids } })
                                    .skip(skip)
                                    .limit(5);


    console.log(documents);
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
  } 
}


router.post("/addsong", async (req, res) => {
    console.log(req.body);
    const { name, imgUrl, audioUrl, type,artistName,artistId,albumName,albumId,language,date,lyrics } = req.body;
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
        date:new Date(date),
        plays:0,
        lyrics:lyrics,
        
      });
      res.status(201).json(songAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });


  router.get("/song", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    
    const limit=50;
  
    try {
      const allSong = await songData.find().skip((page - 1) * limit).limit(limit);
      res.status(200).json(allSong);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post("/fetchplaylist", async (req, res) => {
  try {




    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
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
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/fetchliked", async (req, res) => {
  try {
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/search', async (req, res) => {
  const { name } = req.body;
  try {
    const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
  // 'i' for case-insensitive
    const artist = await artistData.find({ name: { $regex: regex } }).limit(2);
    const songs = await songData.find({ name: { $regex: regex } }).limit(4); // Fetch only 5 matching documents
    res.status(200).json([...songs,...artist]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post("/fetchsingersong", async (req, res) => {
  try {
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/fetchadded", async (req, res) => {
  try {
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/fetchsingle", async (req, res) => {
  try {
    const {id} = req.body;
    const song = await songData.findById(id)
    res.status(200).json(song);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/fetchalbumsong", async (req, res) => {
  try {
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    console.log(song)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/fresh", async (req, res) => {
  try {

    const currentDate = new Date(); // Current date
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(currentDate.getDate() - 20);
    const {page} = req.body ;
    const skip = (page - 1) * 5;


    // Query MongoDB for songs under 20 days old with pagination
    const recentSongs = await songData.find({ date: { $gte: twentyDaysAgo, $lte: currentDate } })
        .skip(skip)
        .limit(5)

      res.status(200).json(recentSongs);
      console.log(recentSongs)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/top", async (req, res) => {
  try {


    const {page} = req.body ;
    const skip = (page - 1) * 5;


    // Query MongoDB for songs under 20 days old with pagination
    const recentSongs = await songData.find({ likes: { $gte: 5 } })
        .skip(skip)
        .limit(5)

      res.status(200).json(recentSongs);
      console.log(recentSongs)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/trend", async (req, res) => {
  try {


    const {page} = req.body ;
    const skip = (page - 1) * 5;


    // Query MongoDB for songs under 20 days old with pagination
    const recentSongs = await songData.find({ likes: { $gte: 5 },plays:{ $gte: 10} })
        .skip(skip)
        .limit(5)

      res.status(200).json(recentSongs);
      console.log(recentSongs)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/filter-songs', async (req, res) => {
  try {
    const { type, language } = req.body;

    const filteredSongs = await songData.find({
      type: { $in: [new RegExp(type, 'i')] },
      language: new RegExp(language, 'i')
    });

    res.json(filteredSongs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching songs' });
  }
});


router.post("/fetchplaylistsong", async (req, res) => {
  try {
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    console.log(song)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




  module.exports = router;
