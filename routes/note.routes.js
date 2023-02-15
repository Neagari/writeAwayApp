const router = require('express').Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route.guard');
//Importing note model
// const { isLoggedOut, isLoggedIn } = require("../middleware/route.guard");
const Note = require("../models/Note.model")
const User = require("../models/User.model")


//
router.get("/",isLoggedIn,async (req, res) => {
    try{
        const user = req.session.user
        console.log("userIdddd...",user)
        const userMatch = await User.findOne(user)
        console.log("userMatch....", userMatch)
        const allNotes = await Note.find({user:userMatch._id})
        console.log("allNotes....", allNotes)
        res.render("auth/profile", {allNotes,user})
    }catch(err){
        console.log("Note's are available!!,something went worng! ",err)
    }
})

router.get("/create",isLoggedIn ,(req, res) => {
    const user = req.session.user
    res.render("notes/newNote", {user,update: false})
})

router.get("/:noteId" ,isLoggedIn,async (req, res) => {
    try{
        const user = req.session.user
        const noteId = req.params.noteId;
        const singleNote = await Note.findById(noteId).populate('user')

        res.render("notes/noteDetails", {singleNote, user})

    } catch(err){
        console.log("Note not found", err)

    }
    
})

router.post("/create",isLoggedIn,async(req, res) => {
    try{

        const body =req.body;
        const user = req.session.user
        console.log("userCreate....",user)
        const findUser = await User.findOne(user)

        console.log("findUser.....", findUser._id)
        const newNote = await Note.create( {...body,user:findUser._id});

        console.log("newNotes....",newNote)
        res.redirect(`/note`);

    }catch(err){ 
        console.log("Note is not created",err)

    }

})

router.get("/:noteId/edit", isLoggedIn,async (req, res) => {
    try{
        const user = req.session.user;
        const noteId = req.params.noteId;
        const noteToUpdate = await Note.findById(noteId);
        console.log("updatedNote....",noteToUpdate)

        res.render("notes/newNote",{noteToUpdate, user,update:true})

    }catch(err){
        console.log("Note not found to update", err)
    }
})

router.post("/:noteId/edit", isLoggedIn,async (req, res) => {
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

router.get("/:noteId/delete", isLoggedIn,async (req, res) => {
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