const express = require("express"),
      router = express.Router({mergeParams: true}),
      Dog = require("../models/dog"),
      Comment = require("../models/comment");

router.get('/new', (req, res) => {
  res.send("New Comment Form");
});

router.post('/', (req, res) => {
  res.send("Post new comment");
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
