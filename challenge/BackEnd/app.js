const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatbotRouter = require('./routes/chatbot');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('esta funcionando');
});

app.use("/chatbot", chatbotRouter);


const puerto = process.env.PORT || 5000;
app.listen(puerto, () => console.log(`todo funciona, puerto ${puerto}`));
