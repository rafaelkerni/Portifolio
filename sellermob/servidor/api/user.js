const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (senha, callback) => {
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(senha, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {

        if (!req.body.email || req.body.email.trim() == ''){
            res.status(400).json('Falta informar o e-mail')
        }else if (!req.body.senha || req.body.senha.trim() == ''){
            res.status(400).json('Falta informar a senha')
        }else if (!req.body.nome || req.body.nome.trim() == ''){
            res.status(400).json('Falta informar o nome')
        }else {
            obterHash(req.body.senha, hash => {
                const senha = hash
                
                app.db('usuarios')
                .insert({ email: req.body.email, 
                          senha, 
                          nome: req.body.nome, 
                          sobrenome: req.body.sobrenome, 
                          tipo_id: 1, 
                          ativo: true })
                .then(_ => res.status(204).json('Usuário cadastrado com sucesso!'))
                .catch(err => {res.status(500).json(err)})
            })
        }
    }
    return { save }
}