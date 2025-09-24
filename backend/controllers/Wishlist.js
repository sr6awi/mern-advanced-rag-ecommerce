const WishlistModel = require("../models/Wishlist");

// Add product to wishlist
exports.addWishlistItem = async (req, res) => {
  try {
    const item = await new WishlistModel(req.body).populate({
      path: "product",
      populate: ["brand"]
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add item to wishlist." });
  }
};

// Get all wishlist items for a user
exports.getWishlistItemsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    let skip = 0, limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const items = await WishlistModel.find({ user: id })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "product",
        populate: ["brand"]
      });

    const total = await WishlistModel.countDocuments({ user: id });

    res.set("X-Total-Count", total);
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not load wishlist items." });
  }
};

// Update wishlist item
exports.updateWishlistItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await WishlistModel.findByIdAndUpdate(id, req.body, { new: true }).populate("product");
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update wishlist." });
  }
};

// Delete wishlist item
exports.removeWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WishlistModel.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to remove wishlist item." });
  }
};
