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
    res.render("dogs/dogs", {dogs: dogs});
  });
});

// NEW ROUTE
router.get('/new', (req, res) => {
  res.render("dogs/new");
});

// CREATE ROUTE
router.post('/', (req, res) => {
  Dog.create(req.body.dog, (err, newDog) => {
    if (err) {
      console.log(err)
      return res.render("dogs/new");
    }
    console.log("Dog Created");
    res.redirect("/dogs");
  });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
  Dog.findById(req.params.id).populate("comments").exec((err, foundDog) => {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
    res.render('dogs/show', {dog: foundDog});
  });
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    if (err) {
      console.log(err);
      return  res.redirect('back');
    }
    res.render('dogs/edit', {dog: foundDog});
  });
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body.dog, (err, dog) => {
    if (err) {
      console.log(err);
      return  res.redirect('back');
    }
    console.log("Dog Updated");
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
    console.log("Dog Removed");
    res.redirect('/dogs');
  });
});

module.exports = router;