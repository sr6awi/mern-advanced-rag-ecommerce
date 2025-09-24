const express = require("express");
const wishlistCtrl = require("../controllers/Wishlist");
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router
  .post("/", authenticateUser, wishlistCtrl.addWishlistItem)
  .get("/user/:id", authenticateUser, wishlistCtrl.getWishlistItemsByUser)
  .patch("/:id", authenticateUser, wishlistCtrl.updateWishlistItemById)
  .delete("/:id", authenticateUser, wishlistCtrl.removeWishlistItem);

module.exports = router;
