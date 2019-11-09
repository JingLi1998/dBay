// REQUIRED PACKAGES
const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      expressSanitizer = require("express-sanitizer"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      flash = require("connect-flash"),
      seedDB = require("./seed");

// MODELS
const Comment = require("./models/comment"),
      Dog = require("./models/dog"),
      User = require("./models/user");

// ROUTES
const commentRoutes = require("./routes/comments"),
      dogRoutes = require("./routes/dogs"),
      indexRoutes = require("./routes/index");

let app = express();

// MONGOOSE CONFIG
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("Database Connected");
}).catch(err => {
  console.log('ERROR', err.message);
});

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// SEED DB IF REQUIRED
// seedDB();

// ROUTE CONFIG
app.use("/", indexRoutes);
app.use("/dogs", dogRoutes);
app.use("/dogs/:id/comments", commentRoutes);

// START APP
app.listen(process.env.PORT, () => {
  console.log(`Server started on 3000`);
});