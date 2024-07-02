const fs = require('fs');
const path = require('path');
const Message = require('../models/chatbotMessage');

const databaseFilePath = path.join(__dirname, '../Database/History.json');

const readDatabase = () => {
  const fileData = fs.readFileSync(databaseFilePath);
  return JSON.parse(fileData);
};

const responses = {
  clasico: {
    hola: 'como va el día',
    'hoy me siento medio mal': 'por eso estoy aqui, para acompañarte, cuentame un poco más',
    'que me recomiendas el día de hoy': 'puedo recomendarte varias cosas, tomar el sol, respirar, disfrutar el momento, que te gustaria hacer',
    'me pregunto cual es el sentido de la vida': 'es dificil encontrarle un sentido a la vida, es importante encontrar el que mejor nos represente ¿lo buscamos juntos?',
    'crees que todo va a salir bien': 'siempre es dificil ver el sol entre un mar de nubes, pero no olvides que ninguna tormenta dura para siempre, sigue disfrutando la vida.'
  },
  astrologia: {
    hola: 'Hola, ¿cómo están tus estrellas hoy?',
    'hoy me siento medio mal': 'Es posible que los astros estén influyendo en tu ánimo. Cuéntame más.',
    'que me recomiendas el día de hoy': 'Hoy los astros sugieren que te tomes un momento para ti mismo, relájate y medita.',
    'me pregunto cual es el sentido de la vida': 'Cada signo tiene su propio camino, el tuyo está lleno de posibilidades. ¿Quieres explorarlo?',
    'crees que todo va a salir bien': 'Los planetas están en constante movimiento, pero siempre hay luz después de la oscuridad.'
  },
  romance: {
    hola: 'Hola, ¿cómo está el amor hoy?',
    'hoy me siento medio mal': 'Estoy aquí para escucharte y apoyarte, cuéntame más, cariño.',
    'que me recomiendas el día de hoy': 'Te recomiendo que hagas algo que te apasione, como leer un poema o escuchar música romántica.',
    'me pregunto cual es el sentido de la vida': 'El sentido de la vida se encuentra en los pequeños momentos de amor y felicidad. ¿Lo descubrimos juntos?',
    'crees que todo va a salir bien': 'El amor siempre encuentra un camino, incluso en los momentos más oscuros.'
  },
  trabajo: {
    hola: 'Hola, ¿cómo va el trabajo hoy?',
    'hoy me siento medio mal': 'El trabajo puede ser estresante, pero estoy aquí para ayudarte. Cuéntame más.',
    'que me recomiendas el día de hoy': 'Te recomiendo organizar tus tareas y tomarte pequeños descansos para mantener la productividad.',
    'me pregunto cual es el sentido de la vida': 'Encontrar un propósito en tu trabajo puede darle sentido a tu vida. ¿Qué te gustaría lograr?',
    'crees que todo va a salir bien': 'Con esfuerzo y dedicación, siempre se puede superar cualquier obstáculo. No te rindas.'
  }
};

const getResponse = (userInput, chatType) => {
  const chatResponses = responses[chatType] || {};
  const response = chatResponses[userInput.toLowerCase()] || 'Lo siento, no tengo una respuesta para eso.';
  const userMessage = new Message('user', userInput, chatType);
  const chatbotMessage = new Message('Chatbot', response, chatType);

  const database = readDatabase();
  if (!database[chatType]) {
    database[chatType] = [];
  }
  database[chatType].push({ id: database[chatType].length + 1, messages: [userMessage, chatbotMessage], firstMessage: userInput });

  return response;
};

const getChatHistory = (chatType) => {
  const database = readDatabase();
  return database[chatType] || [];
};

module.exports = {
  getResponse,
  getChatHistory,
};