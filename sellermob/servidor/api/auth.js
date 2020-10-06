const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.senha){
             return res.status(400).send('Dados incompletos')
        }

        const usuario = await app.db('usuarios')
            .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
            .first()

        if(usuario){
            bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
                if( err || !isMatch ){
                    return res.status(400).send('E-mail e/ou Senha incorretos!')
                }

                const payload = { id: usuario.id }
                res.json({
                    name: usuario.nome,
                    email: usuario.email,
                    permissoes: usuario.permissoes,
                    token: jwt.encode(payload, authSecret),
                })
            })
        }else{
            res.status(400).send('Usuário não cadastrado!')
        }         
    }

    return { signin }
}