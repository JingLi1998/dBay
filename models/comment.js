const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
  },
  author: String,
  text: String,
});

module.exports = mongoose.model("Comment", commentSchema);