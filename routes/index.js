const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

// INDEX ROUTE
router.get('/', (req, res) => {
  res.render('index');
});

// ABOUT ROUTE
router.get('/about', (req, res) => {
  res.render('about');
});

// SIGNUP ROUTE
router.get('/signup', (req, res) => {
  res.render('signup');
});

// SIGNUP LOGIC
router.post('/signup', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.render('signup');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to Dbay ' + user.username);
      res.redirect('/dogs');
    });
  });
});

// LOGIN ROUTE
router.get('/login', (req, res) => {
  res.render('login');
});

// LOGIN LOGIC
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dogs',
  failureRedirect: '/login',
  successFlash: 'Welcome back!',
  failureFlash: true,
}), (req, res) => {
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out.');
  res.redirect('/dogs');
});

module.exports = router;