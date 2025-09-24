const ReviewModel = require("../models/Review");

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const newReview = await new ReviewModel(req.body).populate({
      path: "user",
      select: "-password"
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Review submission failed." });
  }
};

// Get all reviews for a product with pagination
exports.getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    let skip = 0, limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const total = await ReviewModel.countDocuments({ product: id });
    const reviews = await ReviewModel.find({ product: id }).skip(skip).limit(limit).populate("user");

    res.set("X-Total-Count", total);
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not load reviews." });
  }
};

// Update a review
exports.editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true }).populate("user");
    res.status(200).json(updatedReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Review update failed." });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    res.status(200).json(deletedReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete review." });
  }
};
