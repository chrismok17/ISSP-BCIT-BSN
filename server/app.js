const express = require("express");
const app = express();
const port = 8080;
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy


// app.use(session({ 
// secret: 'secret', 
// resave: true, 
// saveUninitialized: true }))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})