const bd = require('../infra/bd');
const Usuario = require('../models/usuario-model');

const usuario = app => {
    
    app.get('/usuario', function (req, res) {
        
        res.json(bd.usuarios);
        //res.send('Rota ativada com GET e recurso usuario: valores de usuario devem ser retornados');
    })
    //rota por parametro
    app.get('/usuario/:nome', function (req, res) {
        const {nome} = req.params.nome;
        res.json({nome});
    })
    app.get('/usuario/:email', (req,res)=>{
        const email = req.params.email;
        for (let i = 0; i <= bd.length; i++) {
            if (bd[i].email == email) {
                return `o email encontrado e ${email}`
            }
        }
    })    
    
    
    app.post('/usuario', function (req, res) {
        const body = req.body;
        const usuarios = new Usuario(body.nome, body.email, body.senha)
         
        bd.usuarios.push(usuarios);
        res.status(201).json({"usuarioCadastrado": body.nome})
        //res.send('Rota POST de usuario ativada: usuario adicionado ao banco de dados');
    })
}

module.exports = usuario;
