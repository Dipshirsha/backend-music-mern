const express = require("express");
const router = express.Router();
const playlistData = require("../Schema/playlistModel");

router.post("/playlistcreate", async (req, res) => {
    console.log(req.body);
    const { name, imgUrl, date,language,songs,type } = req.body;
    try {
      const playlistAdded = await playlistData.create({
        name: name,
        imgUrl: imgUrl,
        date:new Date(date),
        forked:0,
        songs:songs,
        language:language,
        type:type
        
      });
      res.status(201).json(playlistAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });



  router.get("/playlistload", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    
    const limit=20;
  
    try {
      const allPlaylist = await playlistData.find().skip((page - 1) * limit).limit(limit);
      res.status(200).json(allPlaylist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


async function fetchDocumentsByIds(ids,page) {
  try {
    // Convert string IDs to ObjectId if necessary
  

    // Fetch documents using the $in operator
    const skip = (page - 1) * 10;
    
    // Fetch documents using the $in operator with pagination
    const documents = await playlistData.find({ _id: { $in: ids } })
                                    .skip(skip)
                                    .limit(10);


    console.log(documents);
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
  } 
}


router.post("/fetchplaylistid", async (req, res) => {
  const { id } = req.body;

  try {
    const playlist = await playlistData.findById( id
     );
    console.log(playlist)
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/addremovesongfork", async (req, res) => {
  const { id,forked } = req.body;

  try {
    const singleSong = await playlistData.findByIdAndUpdate( id,
     { forked:forked} );
    console.log(singleSong)
    res.status(200).json(singleSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/fetchfork", async (req, res) => {
  try {
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  module.exports = router;