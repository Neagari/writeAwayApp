const express = require('express');
const router = express.Router();
const Note = require('../models/Note.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", async(req, res, next) => {

  try{
    const noteId = req.params.noteId;

    const singleNote = await Note.findById(noteId);
    console.log("profile....",singleNote)

    res.render("notes/one-note", singleNote)
}catch(err){
    console.log("note id not found",err)
}

  res.redirect(`/note/${singleNote._id}`);
});

module.exports = router;
