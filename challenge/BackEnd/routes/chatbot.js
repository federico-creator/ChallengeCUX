let express = require('express');
let router = express.Router();
const controller = require("../controllers/chatbotcontroller")

router.get("/", controller.Message);
router.get("/history/:chatType", controller.MessageHistory)

module.exports = router;