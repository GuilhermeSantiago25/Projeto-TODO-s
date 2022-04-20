const bd = require('../infra/bd');
const Tarefa = require('../models/tarefa-model');


const tarefa = app => {
  
  app.get('/tarefa', function (req, res) {
    return res.json(tarefa);
    //res.send('Rota ativada com GET e recurso tarefa: valores de tarefa devem ser retornados')
  })
  
  app.post('/tarefa', function (req, res) {

    /* console.log(Object.values(body)) //Valores do objeto;
    console.log(Object.keys(body)) //Nome da propriedade do objeto;
    console.log(Object.entries(body)) //REtorna a propriedade e o valor do objeto; */
    //res.send('Rota POST de tarefa ativada: tarefa adicionado ao banco de dados')
  })
}

module.exports = tarefa;