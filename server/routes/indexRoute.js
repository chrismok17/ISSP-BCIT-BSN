const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin, checkNotAuthenticated } = require("../middleware/checkAuth");
// const { forwardAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
const jwt = require('jsonwebtoken')


function getUserToken (email) {
  return jwt.sign({ email }, process.env.SECRET_KEY)
}

// router.get("/", ensureAuthenticated, (req, res) => 
// res.render("dashboard.ejs"));

// router.get("/login", checkNotAuthenticated, (req, res) => {
//   res.render("login.ejs");
// });

router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("signup.ejs");
});


// Created /login endpoint to get login values from front end
// Trying to get the values to be compared with values from mysql
// If successful please send status 200

// router.post("/login", (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//       if (err) {
//         return next(err)
//       }
//       if (!user) {
//         return res.status(401).send({message: info.message})
//       }
//       req.logIn(user, (err) => {
//         if (err) {
//           return next(err);
//         } 
//         return res.status(200).send({message: "Success"})
//       })
//     })(req, res, next)
// })


router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true
    // failureFlash: true,
  }),
  (req, res) => {
    // console.log('passport middleware success', Object.keys(req))
    console.log('req user', req.user, req.authInfo, req.params)
    const token = getUserToken(req.user.email)
    res.status(200).json({ token })
    res.end()
  }
)


// router.post(
//   "/",
//   passport.authenticate("local", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/",
//   })
// );



// redirection to the calendar page
router.get('/calendar', (req, res) => {
  res.render('calendar');
})


router.post('/signup', checkNotAuthenticated, async(req, res)=> { 
  //add code here for inserting new user in to the database
  // const email= req.bosy.email
  // const password= req.bosy.password
  // const password2= req.bosy.password2
})


// logout function
router.post('/logout', function(req, res, next) {
  req.logout(function(err){
      if(err) return next(err);
      res.redirect('/login');
  });
});

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//   res.render("dashboard", {
//     user: req.user,
//   });
// });

module.exports = router;