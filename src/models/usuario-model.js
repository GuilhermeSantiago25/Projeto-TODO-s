const bd = require('../infra/bd');

class Usuario  {
    constructor(id,nome,email,senha){
        this.id = id++; 
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
} 

module.exports = Usuario;