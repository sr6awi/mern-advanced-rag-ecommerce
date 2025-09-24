const express = require('express');
const cartCtrl = require('../controllers/Cart');
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router
  .post("/", authenticateUser, cartCtrl.addCartItem)
  .get("/user/:id", authenticateUser, cartCtrl.getUserCartItems)
  .patch("/:id", authenticateUser, cartCtrl.updateCartItem)
  .delete("/:id", authenticateUser, cartCtrl.deleteCartItem)
  .delete("/user/:id", authenticateUser, cartCtrl.clearCartByUser);

module.exports = router;
