const express = require("express");
const router = express.Router();
const artistData = require("../Schema/artistDataModel");


async function fetchDocumentsByIds(ids,page) {
  try {
    // Convert string IDs to ObjectId if necessary
  

    // Fetch documents using the $in operator
    const skip = (page - 1) * 5;
    
    // Fetch documents using the $in operator with pagination
    const documents = await artistData.find({ _id: { $in: ids } })
                                    .skip(skip)
                                    .limit(5);


    console.log(documents);
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
  } 
}



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
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
  
    try {
      const artists = await artistData.find().skip((page - 1) * limit).limit(limit);
      res.status(200).json(artists);
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
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/searchdashartist", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.json([]);
  }
  try {
    const results = await artistData.find({ name: new RegExp(query, 'i') });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});




module.exports = router;const express = require("express");
const router = express.Router();
const artistData = require("../Schema/artistDataModel");


async function fetchDocumentsByIds(ids,page) {
  try {
    // Convert string IDs to ObjectId if necessary
  

    // Fetch documents using the $in operator
    const skip = (page - 1) * 5;
    
    // Fetch documents using the $in operator with pagination
    const documents = await artistData.find({ _id: { $in: ids } })
                                    .skip(skip)
                                    .limit(5);


    console.log(documents);
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
  } 
}



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
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
  
    try {
      const artists = await artistData.find().skip((page - 1) * limit).limit(limit);
      res.status(200).json(artists);
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
    const {id,page} = req.body;
    const song = await fetchDocumentsByIds(id,page)
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/searchdashartist", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.json([]);
  }
  try {
    const results = await artistData.find({ name: new RegExp(query, 'i') });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});




module.exports = router;
