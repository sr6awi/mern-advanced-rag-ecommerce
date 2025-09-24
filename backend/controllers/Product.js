const ProductModel = require("../models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product creation failed." });
  }
};

// Fetch products with filters, pagination, and sorting
exports.getProducts = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.brand) filter.brand = { $in: req.query.brand };
    if (req.query.category) filter.category = { $in: req.query.category };
    if (req.query.user) filter.isDeleted = false;
    if (req.query.sort) sort[req.query.sort] = req.query.order === "asc" ? 1 : -1;
    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const total = await ProductModel.find(filter).sort(sort).populate("brand").countDocuments();
    const results = await ProductModel.find(filter).sort(sort).populate("brand").skip(skip).limit(limit);

    res.set("X-Total-Count", total);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to fetch product list." });
  }
};

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id).populate("brand").populate("category");
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

// Update product info
exports.modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product update failed." });
  }
};

// Restore soft-deleted product
exports.recoverProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const restored = await ProductModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).populate("brand");
    res.status(200).json(restored);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not restore product." });
  }
};

// Soft delete a product
exports.markProductAsDeleted = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).populate("brand");
    res.status(200).json(removed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete product." });
  }
};
