const CategoryModel = require("../models/Category");

// Retrieve all category entries
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load categories. Please try again." });
  }
};
