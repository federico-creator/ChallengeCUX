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



/* codigo de simulación de usuarios con el que en teoria verifico si esta logueado */
/* app.use((req, res, next) => {
    if(req.session.user != undefined){
      res.locals = {nombre: req.session.user.nombre,
                    apellido:  req.session.user.apellido,
                    idusuario: req.session.user.id,
                    avatar: req.session.user.avatar
      }
    }
    else{
      res.locals = {nombre: null}
    }
    return next()
})

app.use((req, res, next) => {
    if(req.cookies.usuarioId && req.session.user == undefined){
        db.Usuario.findByPk(req.cookies.usuarioId)
        .then(user => {
            req.session.user = user
            res.locals = req.session.user
        })
        .catch (error => console.log(error))
    }
    return next()

})
 */

const puerto = process.env.PORT || 5000;
app.listen(puerto, () => console.log(`todo funciona, puerto ${puerto}`));
