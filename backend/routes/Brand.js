const express = require("express");
const brandCtrl = require("../controllers/Brand");
const router = express.Router();

router.get("/", brandCtrl.getAllBrands);

module.exports = router;
