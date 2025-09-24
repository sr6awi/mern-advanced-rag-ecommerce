const CartModel = require('../models/Cart');

// Add item to user's cart
exports.addCartItem = async (req, res) => {
  try {
    const item = await new CartModel(req.body).populate({
      path: "product",
      populate: { path: "brand" }
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding item to cart. Try again." });
  }
};

// Get cart items by user ID
exports.getUserCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await CartModel.find({ user: id }).populate({
      path: "product",
      populate: { path: "brand" }
    });
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to retrieve cart. Please try again later." });
  }
};

// Update item in cart
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await CartModel.findByIdAndUpdate(id, req.body, { new: true }).populate({
      path: "product",
      populate: { path: "brand" }
    });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cart update failed." });
  }
};

// Remove item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CartModel.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to remove cart item." });
  }
};

// Clear all cart items for a user
exports.clearCartByUser = async (req, res) => {
  try {
    const { id } = req.params;
    await CartModel.deleteMany({ user: id });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not clear cart. Try again." });
  }
};
