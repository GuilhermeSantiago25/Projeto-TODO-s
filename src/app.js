const express = require('express');

const bd = require('../src/infra/bd');

const usuarioController = require('../src/controllers/usuario-controller');

const tarefaController = require('../src/controllers/tarefa-controller');

const app = express();



app.use(express.json()); //middleware

//middleware personalizado.
/* app.use((req, res, next) => {
    if(req.body.id){
        console.log("Passei aqui!");
        next();
    } else{
        console.log("Deu ruim");
    }
}) */

app.listen(8000, ()=>console.log('Rodando no servidor na porta 8000'));

usuarioController(app);
tarefaController(app);