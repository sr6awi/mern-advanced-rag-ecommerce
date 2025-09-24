const express = require('express');
const addressCtrl = require("../controllers/Address");
const { verifyToken: authenticateUser } = require("../middleware/AuthenticateUser");

const router = express.Router();

router.post("/", authenticateUser, addressCtrl.addAddress);
router.get("/user/:id", authenticateUser, addressCtrl.getUserAddresses);
router.patch("/:id", authenticateUser, addressCtrl.modifyAddress);
router.delete("/:id", authenticateUser, addressCtrl.removeAddress);

module.exports = router;
