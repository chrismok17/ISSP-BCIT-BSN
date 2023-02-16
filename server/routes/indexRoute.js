const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin, checkNotAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
const jwt = require('jsonwebtoken')
const path = require('path')


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


module.exports = router;