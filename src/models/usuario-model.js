let  id = 0;
class Usuario  {
    constructor(nome,email,senha){
        this.id = id++; 
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

} 

module.exports = Usuario;