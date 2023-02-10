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
        res.redirect(`/note/${newNote._id}`);

    }catch(err){
        console.log("Note is not created",err)
        
    }

})

router.get("/:noteId", (req, res) => {
    res.render("notes/one-note")
})


module.exports = router;