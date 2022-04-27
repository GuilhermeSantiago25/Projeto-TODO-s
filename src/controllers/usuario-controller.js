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
            .catch((err)=>{
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
        const indicador = req.params.indicador;
        const indexUsuario = bd.usuarios.findIndex((usuario => usuario.nome === indicador || usuario.email === indicador));

        if (indexUsuario > -1) {
            const usuarioDeletado = bd.usuarios.splice(indexUsuario, 1);
            res.status(200).json({
                "deletado": usuarioDeletado,
            });
        } else {
            res.status(404).json({
                "mensagem": `Usuário "${indicador}" não existe`
            });
        }
    });
    app.put('/usuario/:indicador', (req, res) => {
        const indicador = req.params.indicador;
        const body = req.body;
        const indexUsuario = bd.usuarios.findIndex((usuario => usuario.nome === indicador || usuario.email === indicador));

        if (indexUsuario > -1) {
            const usuarioAntigo = bd.usuarios[indexUsuario];
            const usuarioAtualizado = new Usuario(
                body.nome || usuarioAntigo.nome,
                body.email || usuarioAntigo.email,
                body.senha || usuarioAntigo.senha,
                usuarioAntigo.id
            );
            res.status(200).json({
                "Atualizado": usuarioAtualizado
            });
        } else {
            res.status(404).json({
                mensagem: `Usuario com ${nome} não existe.`
            });
        }
    });

}

module.exports = usuario;