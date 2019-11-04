const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      expressSanitizer = require("express-sanitizer"),
      Dog = require("./models/dog"),
      // passport = require("passport"),
      // LocalStrategy = require("passport-local"),
      // User = require("./models/user"),
      // Comment = require("./models/comment"),
      seedDB = require("./seed");

let app = express();

// MONGOOSE CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/dbay_app");

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

seedDB();

// INDEX ROUTE
app.get('/', (req, res) => {
  res.render("index");
});

// DISPLAY DOGS ROUTE
app.get('/:breed', (req, res) => {
  // SHOW ALL
  if (req.params.breed == "all") {
    Dog.find({}, (err, dogs) => {
      if (err) {
        console.log(err);
      } else {
        res.render("breed", {dogs:dogs});
      }
    });
  } else {
    // SHOW A CERTAIN BREED
    Dog.find({breed: req.params.dog}, (err, dogs) => {
      if (err) {
        console.log(err);
      } else {
        res.render("breed", {dogs: dogs});
      }
    });
  }
});

// NEW ROUTE
app.get('/:breed/new', (req, res) => {
  res.render("new");
});

// CREATE ROUTE
app.post('/:breed', (req, res) => {
  Dog.create(req.body.breed, (err, newDog) => {
    if (err) {
      console.log(err);
      res.render("new");
    } else {
      console.log("success");
      res.redirect("/" + req.body.breed);
    }
  });
});

// SHOW ROUTE
app.get('/:breed/:id', (req, res) => {
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
app.get('/:dog/:id/edit', (req, res) => {
  res.send('This is the edit route!');
});

// UPDATE ROUTE
app.put('/:dog/:id', (req, res) => {
  res.send("This is the put route!")
});

// DELETE ROUTE
app.delete('/:dog/:id', (req, res) => {
  res.send('This is the delete route!')
});

// START APP
app.listen(3000, () => {
  console.log(`Server started on 3000`);
});
