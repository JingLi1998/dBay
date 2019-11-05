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
      return res.redirect("back");
    }
    res.render('show', {dog: foundDog});
  });
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    if (err) {
      console.log(err);
      return  res.redirect('back');
    }
    res.render('edit', {dog: foundDog});
  });
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body.dog, (err, dog) => {
    if (err) {
      console.log(err);
      return  res.redirect('back');
    }
    console.log(success);
    res.redirect('/dogs/' + req.params.id);
  });
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, dog) => {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
    dog.remove();
    console.log("removed");
    res.redirect('/dogs');
  });
});

module.exports = router;