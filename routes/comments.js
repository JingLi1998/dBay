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
  res.send("Edit Comment Form");
});

router.put('/:comment_id', (req, res) => {
  res.send("Update Comment");
});

router.delete('/:comment_id', (req, res) => {
  res.send("Delete Comment");
});

module.exports = router;
