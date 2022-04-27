const express = require('express');

const bd = require('../src/infra/sqlite-db');

const usuarioController = require('../src/controllers/usuario-controller');

/* const tarefaController = require('../src/controllers/tarefa-controller'); */

const app = express();

app.use(express.json());

app.listen(8000, ()=>console.log('Rodando no servidor na porta 8000'));

usuarioController(app, bd);
/* tarefaController(app, bd) */;