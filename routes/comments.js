const express = require("express"),
      router = express.Router({mergeParams: true}),
      Dog = require("../models/dog"),
      Comment = require("../models/comment");

router.get('/new', (req, res) => {
  Dog.findById(req.params.id, (err, dog) => {
    if (err) {
      console.log(err);
      return  res.redirect('back');
    }
    res.render("comments/new", {dog: dog});
  })
});

router.post('/', (req, res) => {
  Dog.findById(req.params.id, (err, dog) => {
    if (err) {
      console.log(err);
       res.redirect('back');
    }
    Comment.create(req.body.comment, (err, newComment) => {
      if (err) {
        console.log(err);
        return res.redirect("back");
      }
      console.log(newComment);
      dog.comments.push(newComment);
      dog.save();
      console.log("added new comment");
      res.redirect("/dogs/" + req.params.id);
    });
  });
});

router.get('/:comment_id/edit', (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      console.log(err);
      return  res.redirect('back');
    }
    res.render("comments/edit", {comment: comment, dog_id: req.params.id});
  });
});

router.put('/:comment_id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
     res.redirect('/dogs/' + req.params.id);
  });
});

router.delete('/:comment_id', (req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id, (err) => {
    if (err) {
      console.log(err);
      return res.redirect('back');
    }
    console.log("comment deleted");
     res.redirect('/dogs/' + req.params.id);
  })
});

module.exports = router;
