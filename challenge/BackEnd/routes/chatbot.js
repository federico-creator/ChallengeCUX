let express = require('express');
let router = express.Router();
const controller = require("../controllers/chatbotcontroller")

router.get('/', controller.Message);

module.exports = router;