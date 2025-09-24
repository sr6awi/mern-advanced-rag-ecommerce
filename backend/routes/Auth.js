const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/Auth");

const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

router.post("/signup", authCtrl.registerNewUser);
router.post("/login", authCtrl.authenticateUser);
router.get("/check-auth", authenticateUser, authCtrl.checkSessionValidity);
router.get("/logout", authCtrl.logoutSession);

module.exports = router;
