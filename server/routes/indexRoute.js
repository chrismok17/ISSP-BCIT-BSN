const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
const mysql = require("mysql2");
require("dotenv").config();
const MYSQL_DB = process.env.MYSQL_DB;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

//establishes DB connection
const db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});
// Previous code, ignore

// app.use('/login', (req, res) => {
//   res.send({
//     token: 'test123'
//   });
// });

// Created /login endpoint to get login values from front end
// Trying to get the values to be compared with values from mysql
// If successful please send status 200

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send({ message: "Success" });
    });
  })(req, res, next);
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

//fetch() in AddItem.js sends announcement title/description/date to /add endpoint
//this endpoint sends announcement data to mysql
router.post("/add", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let date = req.body.date;
  let sql = `INSERT INTO announcements (title, description, data) VALUES (${title}, ${description}, ${date})`;
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });
  res.send(title, description, date);
});

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
