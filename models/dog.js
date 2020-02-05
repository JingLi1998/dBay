const mongoose = require('mongoose'),
  Comment = require('../models/comment');

var dogSchema = new mongoose.Schema({
  breed: String,
  gender: String,
  image: String,
  name: String,
  age: String,
  amount: String,
  description: String,
  created: { type: Date, default: Date.now },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

dogSchema.pre('remove', async function() {
  await Comment.remove({
    _id: {
      $in: this.comments
    }
  });
});

module.exports = mongoose.model('Dog', dogSchema);
