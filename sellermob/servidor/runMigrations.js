(() => {
       const knexApp = require('knex')(require('./knexfile.js'))
       try {
              //Migrations Aplicação
              knexApp.migrate.latest()   
              //knexApp.migrate.rollback()
              console.log('Migrations "APLICACAO" complete')

              knexApp.from('bancodados')
              .select('client', 'host', 'database', 'user', 'password')
              .where('tipo', 'D')
              .then(bancos =>    
                     bancos.map(banco =>{
                            //Migrations Dados
                            require('knex')({   
                                   client:         banco.client,
                                   connection: {
                                          host:     banco.host,
                                          database: banco.database,
                                          user:     banco.user,
                                          password: banco.password
                                   }
                            })
                           .migrate.latest({
                                   directory: './migrations/dados',
                                   tableName: 'migrations'
                            }) 
                            .then(() => console.log('Migrations "%s" complete', banco.database))
                            .catch(err => console.log(err))
                     })
              )                         
              .catch(err => console.log('Erro ao buscar bancos: '+err))

       } catch (error) {
              console.error('Erro Migrations Aplicacao: '+error)   
       } 
})()

