const router = require('express').Router();
//Importing note model
// const { isLoggedOut, isLoggedIn } = require("../middleware/route.guard");
const Note = require("../models/Note.model")
const User = require("../models/User.model")


//
router.get("/",async (req, res) => {
    try{
        const allNotes = await Note.find()
        console.log("allNotes....", allNotes)
        res.render("notes/allNotes", {allNotes})
    }catch(err){
        console.log("Note's are available!!,something went worng! ",err)
    }
})

router.get("/create" ,(req, res) => {
    res.render("notes/newNote", {update: false})
})

router.get("/:noteId" ,async (req, res) => {
    try{
        const noteId = req.params.noteId;
        const singleNote = await Note.findById(noteId)

        res.render("notes/noteDetails", {singleNote})

    } catch(err){
        console.log("Note not found", err)

    }
    
})

router.post("/create",async(req, res) => {
    try{
        const body ={...req.body};
        // console.log("userId.....", userId)
        const newNote = await (await Note.create(body));
        console.log("newNotes....",newNote)
        res.redirect(`/note`);

    }catch(err){
        console.log("Note is not created",err)

    }

})

router.get("/:noteId/edit", async (req, res) => {
    try{
        const noteId = req.params.noteId;
        const noteToUpdate = await Note.findById(noteId);
        console.log("updatedNote....",noteToUpdate)

        res.render("notes/newNote",{noteToUpdate, update:true})

    }catch(err){
        console.log("Note not found to update", err)
    }
})

router.post("/:noteId/edit", async (req, res) => {
    try{
        const noteId = req.params.noteId;
        const body ={...req.body}; 
        const updatedNote = await Note.findByIdAndUpdate(noteId,body);
        console.log("updatedNote....",updatedNote)

        res.redirect(`/note/${noteId}`)

    }catch(err){
        console.log("Note not found to update", err)
    }
})

router.get("/:noteId/delete", async (req, res) => {
    try{
        const noteId = req.params.noteId;
        const deletedNote = await Note.findByIdAndDelete(noteId);
        console.log("deletedNote....",deletedNote)
    
        res.redirect(`/note`)
    }catch(err){
        console.log("Note not found to delete", err)
    }

})

module.exports = router;