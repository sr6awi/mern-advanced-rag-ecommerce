const express = require("express");
const userCtrl = require("../controllers/User");
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router
  .get("/:id", authenticateUser, userCtrl.fetchUserById)
  .patch("/:id", authenticateUser, userCtrl.updateUserInfo);

module.exports = router;
