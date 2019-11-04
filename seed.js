const mongoose = require("mongoose"),
      Dog = require("./models/dog");

var data = [
  {
    name: "Leo",
    breed: "Toy Poodle",
    image: "https://images.pexels.com/photos/220917/pexels-photo-220917.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    age: "3",
    amount: "$30/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo!",
  },
  {
    name: "Rex",
    breed: "Bulldog",
    image: "https://images.pexels.com/photos/776078/pexels-photo-776078.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    age: "1",
    amount: "$50/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo!",
  },
  {
    name: "Betsy",
    breed: "Golden Retriever",
    image: "https://images.pexels.com/photos/1870301/pexels-photo-1870301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    age: "5",
    amount: "$35/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo!",
  },
  {
    name: "Casper",
    breed: "Porter Collie",
    image: "https://images.pexels.com/photos/1562983/pexels-photo-1562983.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    age: "3",
    amount: "$30/day",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eius totam magni explicabo!",
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