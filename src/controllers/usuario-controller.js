const bd = require('../infra/bd');
const Usuario = require('../models/usuario-model');

const usuario = app => {
    //PROCURA NO BANCO TODOS OS USUARIOS 
    app.get('/usuario', function (req, res) {

        res.json(bd.usuarios);
        //res.send('Rota ativada com GET e recurso usuario: valores de usuario devem ser retornados');
    })
    
    //rota por parametro :nome
    app.get('/usuario/:nome', function (req, res) {
        const {
            nome
        } = req.params.nome;
        res.json({
            nome
        });
    })
    
    //rota por parametro :email
    app.get('/usuario/:email', (req, res) => {
        const email = req.params.email;
        for (let i = 0; i <= bd.length; i++) {
            if (bd[i].email == email) {
                return `o email encontrado é: ${email}`
            }
        }
    })

    //Cria um novo usuario atraves da classe Usuario
    app.post('/usuario', function (req, res) {
        const body = req.body;
        const usuarios = new Usuario(body.nome, body.email, body.senha)

        bd.usuarios.push(usuarios);
        res.status(201).json({
            "usuarioCadastrado": body.nome, 
        })
        //res.send('Rota POST de usuario ativada: usuario adicionado ao banco de dados');
    })
    
    //Exclui um usuario pelo nome
    app.delete('/usuario/:nome', (req,res) => {
        const nome = req.params.nome;
        const indexUsuario = bd.usuarios.findIndex((usuario => usuario.nome === nome))
        if (indexUsuario > -1) {
            const usuarioDeletado = bd.usuarios.splice(indexUsuario, 1);
            res.json({
                "deletado": usuarioDeletado,
            });
        } else {
            res.json({
                "mensagem": `Usuário com nome "${nome}" não existe`
            })
        }
    })
    
    
    //Exclui um usuario pelo email;
    app.delete('/usuario/:email', (req, res) => {
        const email = req.params.email;
        const indexUsuario = bd.usuarios.findIndex((usuario => usuario.email === email));

        if (indexUsuario > -1) {
            const usuarioDeletado = bd.usuarios.splice(indexUsuario, 1);
            res.json({
                "deletado": usuarioDeletado,
            })
        } else {
            res.json({
                "mensagem": `Usuário com email "${email}" não existe`,
            })
        }
    })

}

module.exports = usuario;