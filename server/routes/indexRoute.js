const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");


router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

router.post("/login", (req, res, next) => {
  console.log(req.body)
    passport.authenticate("local", (err, user, info) => {
      // console.log(user)
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).send({message: info.message})
      }
      req.logIn(user, (err) => {
        console.log(user)
        if (err) {
          return next(err);
        } 
        return res.status(200).json({message: "Success"})
      })
    })(req, res, next)
})

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

module.exports = router;