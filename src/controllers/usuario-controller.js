
const Usuario = require('../models/usuario-model');

const usuario = (app,bd) => {
    //PROCURA NO BANCO TODOS OS USUARIOS 
    app.get('/usuario', (req, res) =>{
        bd.all('SELECT * FROM USUARIOS',(err, rows) => {
            if(err){
                res.json("ERRO AO SELECIONAR O BANCO")
            } else {
                res.json({
                    "Banco selecionado": rows
                });
            }
        });
      
    });
    
    //PROCURA NO BANCO PELO PARAMETRO
    app.get('/usuario/:indicador', function (req, res) {
        const indicador = req.params.indicador;
        const indexUsuario = bd.usuarios.findIndex((usuario => usuario.nome === indicador || usuario.email === indicador));
        
        if (indexUsuario > -1) {
            
            res.status(200).json({
                "Usuario": bd.usuarios,
            });
        } else {
            res.json({
                "mensagem": `Usuário "${indicador}" não existe`,
            });
        }

    });
    
    //Cria um novo usuario atraves da classe Usuario
    app.post('/usuario', function (req, res) {
        const body = req.body;
        const usuarios = new Usuario(body.nome, body.email, body.senha);

        bd.usuarios.push(usuarios);
        res.status(201).json({
            "usuarioCadastrado": body.nome, 
        });
    });
    
    //EXCLUI UM USUARIO PELO PARAMETRO
    app.delete('/usuario/:indicador', (req,res) => {
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
    

    //ATUALIZA O USUARIO PELO PARAMETRO;
    app.put('/usuario/:indicador', (req,res) =>{
        const indicador = req.params.indicador;
        const body = req.body;
        const indexUsuario = bd.usuarios.findIndex((usuario => usuario.nome === indicador || usuario.email === indicador));

        if(indexUsuario > -1) {
            const usuarioAntigo = bd.usuarios[indexUsuario];
            const usuarioAtualizado = new Usuario(
                body.nome || usuarioAntigo.nome,
                body.email || usuarioAntigo.email,
                body.senha || usuarioAntigo.senha,
                usuarioAntigo.id
            );
            res.status(200).json({"Atualizado": usuarioAtualizado});
        } else {
            res.status(404).json({mensagem: `Usuario com ${nome} não existe.`});
        }
    });

}

module.exports = usuario;