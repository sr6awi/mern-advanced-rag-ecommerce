const Order = require("../models/Order");


const orders = [];

exports.seedOrder = async () => {
  try {
    await Order.insertMany(orders);
    console.log("Order seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
