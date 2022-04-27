const Usuario = require('../models/usuario-model');

class UsuarioDAO {
    constructor (bd){
        this.bd= bd;
    }

    listarUsuario(){
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM USUARIOS`,(err, rows) => {
                if(err){
                    reject (err);
                } else {
                    resolve (
                        rows
                    );
                }
        })
    })}

    listarUsuarioParam(indicador){
        return new Promise ((resolve,reject) =>{
            this.bd.all(`SELECT * FROM USUARIOS WHERE id = ${indicador} or name = ${indicador} or email = ${indicador}`,(err, rows) => {
                if (err) {
                    reject (err);
                } else {
                    resolve({
                        "Banco selecionado": rows
                    });
                }
            });
        })
    }


    inserirUsuario(usuarios){ 
        return new Promise((resolve,reject) =>{
            this.bd.run(`INSERT INTO USUARIOS (NOME,EMAIL,SENHA) VALUES (?,?,?)`, [usuarios.nome, usuarios.email, usuarios.senha],
            (err) => {
                if (err) {
                    reject (err)
                } else {
                    resolve (
                      'success'
                    );
                }
            });
        });
    }


}

module.exports = UsuarioDAO;