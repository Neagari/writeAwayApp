const express = require('express');
const { isLoggedIn } = require('../middleware/route.guard');
const router = express.Router();
const Note = require('../models/Note.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {user: req.session.user });
});




module.exports = router;
