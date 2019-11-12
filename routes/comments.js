const express = require('express'),
      router = express.Router({mergeParams: true}),
      Dog = require('../models/dog'),
      Comment = require('../models/comment'),
      middleware = require('../middleware');

router.get('/new', middleware.isLoggedIn, (req, res) => {
  Dog.findById(req.params.id, (err, dog) => {
    if (err) {
      req.flash('error', 'Something went wrong, please try again');
      return res.redirect('back');
    }
    res.render('comments/new', {dog: dog});
  })
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  let author = {
    id: req.user._id,
    username: req.user.username,
  }
  req.body.comment.author = author;
  Dog.findById(req.params.id, (err, dog) => {
    if (err) {
      req.flash('error', 'Something went wrong, please try again');
      return res.redirect('back');
    }
    console.log(req.body.comment);
    Comment.create(req.body.comment, (err, newComment) => {
      if (err) {
        console.log(err);
        req.flash('error', 'Something went wrong, please try again');
        return res.redirect('back');
      }
      console.log(newComment);
      dog.comments.push(newComment);
      dog.save();
      req.flash('success', 'Your comment has been added');
      res.redirect('/dogs/' + req.params.id);
    });
  });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    res.render('comments/edit', {comment: comment, dog_id: req.params.id});
  });
});

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    if (err) {
      req.flash('error', 'Something went wrong please try again');
      return res.redirect('back');
    }
    console.log(err);
    req.flash('success', 'Your comment has been updated');
    res.redirect('/dogs/' + req.params.id);
  });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id, (err) => {
    req.flash('success', 'Your comment has been deleted');
    res.redirect('/dogs/' + req.params.id);
  });
});

module.exports = router;
