const User = require("../models/User");

const users = [
  {
    _id: "6823220b0678dd284ac6ac83",
    name: "Tester",
    email: "tester@gmail.com",
    password: "$2b$10$E41opyVpD4rLHAg1iZeWm.6Ek0x2dHJaZ.xKPBn8JwAl6n4m0d.7C", // -> Test123 hashed using node bcrypt
    isVerified: true,
    isAdmin: false
  }
];

exports.seedUser = async () => {
  try {
    await User.deleteMany(); // removing old users
    await User.insertMany(users); // adding new users
    console.log("✅ User seeded successfully");
  } catch (error) {
    console.log("❌ User seeding failed:", error);
  }
};


// node
// const bcrypt = require("bcrypt")
// bcrypt.hash("12345678", 10).then(console.log)

// for the newId 
// const mongoose = require("mongoose");
// const newId = new mongoose.Types.ObjectId();
// console.log(newId.toHexString());