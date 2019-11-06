const mongoose = require("mongoose");

var dogSchema = new mongoose.Schema({
  breed: String,
  gender: String,
  image: String,
  name: String,
  age: String,
  amount: String,
  description: String,
  created: {type: Date, default: Date.now},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  }
});

module.exports = mongoose.model("Dog", dogSchema);
