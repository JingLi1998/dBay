const mongoose = require("mongoose");

var dogSchema = new mongoose.Schema({
  breed: String,
  image: String,
  name: String,
  age: String,
  amount: String,
  description: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Dog", dogSchema);
