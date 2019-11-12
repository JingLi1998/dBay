const Dog = require('../models/dog'),
      Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that.');
  res.redirect('/login');
}

middlewareObj.checkDogOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Dog.findById(req.params.id, (err, dog) => {
      if (err || !dog) {
        req.flash('error', 'Something went wrong.');
        return res.redirect('back');
      }
      if (Dog.author.id.equals(req.user._id)) {
        return next();
      }
      req.flash('error', 'You don\'t have permission to do that');
    });
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err || !comment) {
        req.flash('error', 'Something went wrong.');
        return res.redirect('back');
      }
      if (comment.author.id.equals(req.user._id)) {
        return next();
      }
      req.flash('error', 'You don\'t have permission to do that');
    });
  }
}

module.exports = middlewareObj;