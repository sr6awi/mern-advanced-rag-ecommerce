const OrderModel = require("../models/Order");

// Create a new order entry
exports.placeOrder = async (req, res) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed. Try again." });
  }
};

// Retrieve orders made by a specific user
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userOrders = await OrderModel.find({ user: id });
    res.status(200).json(userOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not fetch user orders." });
  }
};

// Admin: Get all orders with pagination support
exports.getAllOrdersPaginated = async (req, res) => {
  try {
    let skip = 0, limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const total = await OrderModel.countDocuments();
    const orders = await OrderModel.find().skip(skip).limit(limit);

    res.header("X-Total-Count", total);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving orders." });
  }
};

// Update a single order
exports.updateOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update order." });
  }
};
