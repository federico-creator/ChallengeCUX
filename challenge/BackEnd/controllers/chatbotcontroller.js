const chatbotService = require('../services/chatbotService');

const Message = (req, res) => {
  const { userInput, chatType } = req.body;
  const response = chatbotService.getResponse(userInput, chatType);
  res.status(200).json({ chatbotResponse: response });
};

module.exports = {Message}