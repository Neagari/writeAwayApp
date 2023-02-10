const router = require('express').Router();
//Importing note model
const Note = require("../models/Note.model")

//
router.get("/create", (req, res) => {
    res.render("notes/new-note")
})
router.post("/create", async(req, res) => {
    try{
        const body ={...req.body};

        const newNote = await Note.create(body);
        console.log("newNotes....",newNote)
        res.redirect(`/profile`);

    }catch(err){
        console.log("Note is not created",err)

    }

})



router.get("/:noteId", async(req, res) => {
    try{
        const noteId = req.params.noteId;

        const singleNote = await Note.findById(noteId);
        console.log("singleNote....",singleNote)

        res.render("notes/one-note", singleNote)
    }catch(err){
        console.log("User id not found",err)
    }
})


module.exports = router;