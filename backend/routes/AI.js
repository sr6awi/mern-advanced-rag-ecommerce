const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../controllers/AIController');

// Correct route
router.post('/chat', chatWithAssistant);

// Correct export
module.exports = router;
