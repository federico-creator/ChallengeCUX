const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatbotcontroller');

router.post("/:chatType", controller.Message);
router.get("/history/:chatType", controller.MessageHistory);

module.exports = router;