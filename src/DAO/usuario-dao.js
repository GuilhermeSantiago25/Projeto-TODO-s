const Usuario = require('../models/usuario-model');

class UsuarioDAO {
    constructor(bd) {
        this.bd = bd;
    }

    listarUsuario() {
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM USUARIOS`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        rows
                    );
                }
            })
        })
    }

    listarUsuarioParam(indicador) {
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM USUARIOS WHERE id = ? or name = ? or email = ?`, [indicador], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        "Banco selecionado": rows
                    });
                }
            });
        });
    }

    inserirUsuario(usuarios) {
        return new Promise((resolve, reject) => {
            this.bd.run(`INSERT INTO USUARIOS (NOME,EMAIL,SENHA) VALUES (?,?,?)`, [usuarios.nome, usuarios.email, usuarios.senha],
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(
                            'success'
                        );
                    }
                });
        });
    }

    atualizarUsuario() {
        return new Promise((resolve, reject) => {
            const {
                nome,
                email,
                senha
            } = Usuario;
            this.bd.run(`UPDATE USUARIOS
            SET nome = ?,
            email=?,
            senha=?,
            WHERE id = ?`,
                [nome, email, senha, id],
                (err) => {
                    if (err, rows) {
                        reject(err)
                    } else {
                        resolve({
                            "Usuário atualizado": rows
                        });
                    }
                });
        });
    }

}

module.exports = UsuarioDAO;