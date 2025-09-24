const express = require("express");
const categoryCtrl = require("../controllers/Category");
console.log("categoryCtrl =>", categoryCtrl); 

const router = express.Router();

router.get("/", categoryCtrl.getAllCategories);

module.exports = router;
