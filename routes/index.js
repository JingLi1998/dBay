const express = require("express"),
      router = express.Router();
      // passport = require("passport"),
      // User = require("../models/user");

// INDEX ROUTE
router.get('/', (req, res) => {
  res.render("index");
});

// ABOUT ROUTE
router.get('/about', (req, res) => {
  res.send("You have reached the about route");
});

// LOGIN ROUTE
router.get('/login', (req, res) => {
  res.render('login');
});

// SIGNUP ROUTE
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;