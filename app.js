// REQUIRED PACKAGES
const express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  expressSanitizer = require('express-sanitizer'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('./models/user'),
  flash = require('connect-flash'),
  seedDB = require('./seed'),
  session = require('express-session'),
  MemoryStore = require('session-memory-store')(session);

// ROUTES
const commentRoutes = require('./routes/comments'),
  dogRoutes = require('./routes/dogs'),
  indexRoutes = require('./routes/index');

let app = express();
require('dotenv').config();

// MONGOOSE CONFIG
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch(err => {
    console.log('ERROR', err.message);
  });

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    name: 'JSESSION',
    secret: 'Luna Gao',
    store: new MemoryStore()
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// SEED DB IF REQUIRED
seedDB();

// ROUTE CONFIG
app.use('/', indexRoutes);
app.use('/dogs', dogRoutes);
app.use('/dogs/:id/comments', commentRoutes);

// START APP
app.listen(process.env.PORT, () => {
  console.log(`Server started on 3000`);
});
