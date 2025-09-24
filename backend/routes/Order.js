const express = require('express');
const orderCtrl = require("../controllers/Order");
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router.post("/", authenticateUser, orderCtrl.placeOrder);
router.get("/", authenticateUser, orderCtrl.getAllOrdersPaginated);
router.get("/user/:id", authenticateUser, orderCtrl.getOrdersByUserId);
router.patch("/:id", authenticateUser, orderCtrl.updateOrderDetails);

module.exports = router;
