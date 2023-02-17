const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin, checkNotAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
const jwt = require('jsonwebtoken')
const path = require('path')
const updateForm = require('../models/openLabForm');


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

router.post('/getMonth', function(req, res) {
  console.log(Object.keys(req))
  console.log("req.body", req.body)
  updateForm.findMonth(req.body.month)
    .then((results) => {
      console.log("update form results", results)
      if (results) {
        res.status(200).json({ results })
      } else {
        throw new Error("posting to update form", {cause: results})
      }
    }).catch((err) => {
      console.error(err)
    })
})

router.post('/updateCalendar', function(req, res) {
  console.log(Object.keys(req))
  console.log("req.body.forms", req.body.forms)
  updateForm.updateCalendar(req.body.forms)
    .then((results) => {
      console.log("update form results", results)
      if (results) {
        res.status(200).json({ results })
      } else {
        throw new Error("posting to update form", {cause: results})
      }
    }).catch((err) => {
      console.error(err)
    })
})

// logout function
router.post('/logout', function(req, res, next) {
  req.logout(function(err){
      if(err) return next(err);
      res.redirect('/login');
  });
});


module.exports = router;