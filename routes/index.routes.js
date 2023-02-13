const express = require('express');
const { isLoggedIn } = require('../middleware/route.guard');
const router = express.Router();
const Note = require('../models/Note.model');

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});




module.exports = router;
