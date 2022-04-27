const UsuarioDAO = require('../DAO/usuario-dao');
const Usuario = require('../models/usuario-model');

const usuario = (app, bd) => {
        const usuarioDao = new UsuarioDAO(bd);
        app.get('/usuario', (req, res) => {
            usuarioDao.listarUsuario()
                .then((resposta) => {
                    res.json(resposta);
                })
                .catch((err) => {
                    res.json(err);
                })
        });

        app.get('/usuario/:indicador', function (req, res) {
            const indicador = req.params.indicador;
            const usuarioDao = new UsuarioDAO(bd);
            app.get('/usuario', (req, res) => {
                usuarioDao.listarUsuarioParam(indicador)
                    .then((resposta) => {
                        res.json(resposta);
                    })
                    .catch((err) => {
                        res.json(err);
                    })
            })
        });

        app.post('/usuario', function (req, res) {
            const body = req.body;
            const usuarios = new Usuario(body.nome, body.email, body.senha);
            const usuarioDao = new UsuarioDAO(bd);
            usuarioDao.inserirUsuario(usuarios)
                .then(() => {
                    res.json("Sucess");
                })
                .catch((err) => {
                    res.json(err);
                })
        });

        app.delete('/usuario/:indicador', (req, res) => {

        });

        app.put('/usuario/:indicador', (req, res) => {

        });
    }
        module.exports = usuario;