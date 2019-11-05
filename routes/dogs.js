const express = require("express"),
      router = express.Router(),
      Dog = require("../models/dog");

// DISPLAY DOGS ROUTE
router.get('/', (req, res) => {
  // SHOW ALL
  Dog.find({}, (err, dogs) => {
    if (err) {
      return console.log(err);
    }
    res.render("dogs", {dogs: dogs});
  });
});

// NEW ROUTE
router.get('/new', (req, res) => {
  res.render("new");
});

// CREATE ROUTE
router.post('/', (req, res) => {
  Dog.create(req.body.dog, (err, newDog) => {
    if (err) {
      console.log(err)
      return res.render("new");
    }
    console.log(newDog);
    res.redirect("/dogs");
  });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render('show', {dog: foundDog});
    }
  });
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
  res.send('This is the edit route!');
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
  res.send("This is the put route!")
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
  res.send('This is the delete route!')
});

module.exports = router;