const Message = require('../models/chatbotMessage');

const chatHistory = {
  1: [],
  2: [],
  3: [],
  4: []
};

const responses = {
  1: 'Respuesta predeterminada para el tipo 1',
  2: 'Respuesta predeterminada para el tipo 2',
  3: 'Respuesta predeterminada para el tipo 3',
  4: 'Respuesta predeterminada para el tipo 4'
};

const getResponse = (userInput, chatType) => {
  const response = responses[chatType] || 'No se encuentra respuesta para este tipo de chat.';
  const userMessage = new Message('user', userInput, chatType);
  const botMessage = new Message('Chatbot', response, chatType);

  chatHistory[chatType].push(userMessage, botMessage);

  return response;
};

const MessageHistory = (chatType) => {
  return chatHistory[chatType] || [];
};

module.exports = {
  getResponse,
  MessageHistory,
};