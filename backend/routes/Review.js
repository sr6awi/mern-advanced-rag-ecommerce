const express = require('express');
const reviewCtrl = require("../controllers/Review");
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router
  .post("/", authenticateUser, reviewCtrl.createReview)
  .get("/product/:id", reviewCtrl.getProductReviews)
  .patch("/:id", authenticateUser, reviewCtrl.editReview)
  .delete("/:id", authenticateUser, reviewCtrl.deleteReview);

module.exports = router;
