const bd = require('../infra/bd');
const Usuario = require('../models/usuario-model');

const usuario = app => {
    
    app.get('/usuario', function (req, res) {
        return res.json(Usuario);
        //res.send('Rota ativada com GET e recurso usuario: valores de usuario devem ser retornados');
    })
    //rota por parametro
    app.get('/usuario/:nome/:idade', function (req, res) {
        const {nome,idade} = req.params;    
        res.json(req.params);

    })
    
    app.post('/usuario', function (req, res) {
    
        //res.send('Rota POST de usuario ativada: usuario adicionado ao banco de dados');
    })
}

module.exports = usuario;
