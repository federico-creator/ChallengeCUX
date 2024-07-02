const chatbotService = require('../services/chatbotService');

const Message = (req, res) => {
  const { userInput } = req.body;
  const { chatType } = req.params;
  const response = chatbotService.getResponse(userInput, chatType);
  res.status(200).json({ chatbotResponse: response });
};

const MessageHistory = (req, res) => {
  const { chatType } = req.params;
  const history = chatbotService.getChatHistory(chatType);
  res.status(200).json(history);
};

module.exports = { Message, MessageHistory };