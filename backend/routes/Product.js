const express = require('express');
const productCtrl = require("../controllers/Product");
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router
  .post("/", authenticateUser, productCtrl.addProduct)
  .get("/", productCtrl.getProducts)
  .get("/:id", productCtrl.getProductById)
  .patch("/:id", authenticateUser, productCtrl.modifyProduct)
  .patch("/undelete/:id", authenticateUser, productCtrl.recoverProduct)
  .delete("/:id", authenticateUser, productCtrl.markProductAsDeleted);

module.exports = router;
