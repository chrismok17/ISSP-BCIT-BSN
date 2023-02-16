const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin, checkNotAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
const jwt = require('jsonwebtoken')
const path = require('path')
const { getAnnouncement } = require("../models/announcement");
const mysql = require("mysql2");
require("dotenv").config();

const MYSQL_DB = process.env.MYSQL_DB;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

function getUserToken (email) {
  return jwt.sign({ email }, process.env.SECRET_KEY)
}

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})


router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true
  }),
  (req, res) => {
    console.log('req user', req.user, req.authInfo, req.params)
    const token = getUserToken(req.user.email)
    res.status(200).json({ token, email: req.user.email, isAdmin: req.user.isAdmin })
    res.end()
  }
)


// logout function
router.post('/logout', function(req, res, next) {
  req.logout(function(err){
      if(err) return next(err);
      res.redirect('/login');
  });
});

router.get("/announcement", async (req, res) => {
  try {
    const announcement = await getAnnouncement();
    return res.status(200).send(announcement);
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
  
});


module.exports = router;
