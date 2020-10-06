module.exports = (app, idUsuario, tipo, configBanco) =>
    app.db('bancodados')
    .select('bancodados.client', 'bancodados.host', 'bancodados.database', 'bancodados.user', 'bancodados.password')
    .leftJoin('usuarios', 'usuarios.empresa_id', 'bancodados.empresa_id')
    .where({ 'usuarios.id': idUsuario, 'bancodados.tipo': tipo })
    .first()
    .then(banco => {
        configBanco({   
                client: banco.client,
                connection: {
                    host: banco.host,
                    database: banco.database,
                    user:     banco.user,
                    password: banco.password
                },
                pool: { min: 0, max: 1, idleTimeoutMillis: 1, },
            })
        })
                            
    .catch(err => console.log(err))


