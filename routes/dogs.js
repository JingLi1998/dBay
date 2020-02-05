const express = require('express'),
  router = express.Router(),
  Dog = require('../models/dog'),
  middleware = require('../middleware');

// DISPLAY DOGS ROUTE
router.get('/', (req, res) => {
  // SHOW ALL
  Dog.find({}, (err, dogs) => {
    if (err) {
      req.flash('error', 'Something went wrong, please try again');
      return res.redirect('back');
    }
    res.render('dogs/dogs', { dogs: dogs });
  });
});

// NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('dogs/new');
});

// CREATE ROUTE
router.post('/', middleware.isLoggedIn, (req, res) => {
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  req.body.dog.author = author;
  Dog.create(req.body.dog, (err, newDog) => {
    if (err) {
      req.flash('error', 'Your dog could not be added');
      return res.render('dogs/new');
    }
    req.flash('success', 'Your dog has been added');
    res.redirect('/dogs');
  });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
  Dog.findById(req.params.id)
    .populate('comments')
    .exec((err, foundDog) => {
      res.render('dogs/show', { dog: foundDog });
    });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.checkDogOwnership, (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    res.render('dogs/edit', { dog: foundDog });
  });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkDogOwnership, (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body.dog, (err, dog) => {
    if (err) {
      req.flash('error', 'Could not update dog');
      return res.redirect('back');
    }
    req.flash('success', 'Your dog has been updated');
    res.redirect('/dogs/' + req.params.id);
  });
});

// DELETE ROUTE
router.delete('/:id', middleware.checkDogOwnership, (req, res) => {
  Dog.findById(req.params.id, (err, dog) => {
    dog.remove();
    req.flash('success', 'Your dog has been deleted');
    res.redirect('/dogs');
  });
});

module.exports = router;
