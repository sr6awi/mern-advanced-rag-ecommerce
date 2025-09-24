const BrandModel = require("../models/Brand");

// Get the complete list of available brands
exports.getAllBrands = async (req, res) => {
  try {
    const brandList = await BrandModel.find({});
    res.status(200).json(brandList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch brands. Please try again." });
  }
};
