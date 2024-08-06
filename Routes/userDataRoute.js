const express = require("express");
const router = express.Router();
const userData = require("../Schema/userDataModel");
//CREATE
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, photo,fireBaseId } = req.body;
  try {
    const userAdded = await userData.create({
      name: name,
      email: email,
      photo: photo,
      playlist:[],
      playhistory:[],
      liked:[],
      fireBaseId:fireBaseId,
      following:[],
      forked:[],
      added:[],
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});


router.post("/userget", async (req, res) => {

  const { fireBaseId } = req.body;

  try {
    const singleUser = await userData.findOne({ fireBaseId: fireBaseId });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/addremoveplaylist", async (req, res) => {

  const { id,playlist } = req.body;

  try {
    const singleUser = await userData.findByIdAndUpdate( id,
     { playlist:playlist} );
    console.log(singleUser)
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/added", async (req, res) => {

  const { id,added } = req.body;

  try {
    const singleUser = await userData.findByIdAndUpdate( id,
     { added:added} );
    console.log(singleUser)
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post("/addremoveuserlike", async (req, res) => {

  const { id,liked } = req.body;

  try {
    const singleUser = await userData.findByIdAndUpdate( id,
     { liked:liked} );
    console.log(singleUser)
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post("/updatehistory", async (req, res) => {

  const { id,playhistory } = req.body;

  try {
    const singleUser = await userData.findByIdAndUpdate( id,
     { playhistory:playhistory} );
    console.log(singleUser)
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/updatefollowing", async (req, res) => {

  const { id,following } = req.body;

  try {
    const singleUser = await userData.findByIdAndUpdate( id,
     { following:following} );
    console.log(singleUser)
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post("/addremoveuserfork", async (req, res) => {

  const { id,forked } = req.body;

  try {
    const singleUser = await userData.findByIdAndUpdate( id,
     { forked:forked} );
    console.log(singleUser)
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
