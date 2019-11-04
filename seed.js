const mongoose = require("mongoose"),
      Dog = require("./models/dog");

var data = [
  {
    name: "Leo",
    breed: "Toy Poodle",
    image: "",
    age: "3",
    amount: "$30/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo maiores earum similique numquam, ex rem maxime iusto repudiandae doloribus nobis optio recusandae dolore, neque non dolorum!",
  },
  {
    name: "Leo",
    breed: "Toy Poodle",
    image: "",
    age: "3",
    amount: "$30/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo maiores earum similique numquam, ex rem maxime iusto repudiandae doloribus nobis optio recusandae dolore, neque non dolorum!",
  },
  {
    name: "Leo",
    breed: "Toy Poodle",
    image: "",
    age: "3",
    amount: "$30/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo maiores earum similique numquam, ex rem maxime iusto repudiandae doloribus nobis optio recusandae dolore, neque non dolorum!",
  },
]

function seedDB() {
  // delete dogs
  Dog.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed All");
      // add new dogs
      data.forEach(seed => {
        Dog.create(seed, (err, dog) => {
          if (err) {
            console.log(err);
          } else {
            console.log("New Dog");
          }
        });
      });
    }
  });
}

module.exports = seedDB;