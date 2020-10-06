 //Migrations Aplicação
 (async () => {

  const arrayVazio = array => {
    if (!array || !array.length) {
      return true;
    } else{
      return false;
    }
  }

const knexApp = require('knex')( require('./knexfile.js'))
      const id = process.argv[2];
      if(id === 'a'){
        knexApp.seed.run({
              directory: './migrations/aplicacao/seeds'
            }) 
            .then(() => console.log('Seeds APLICACAO complete'))
            .catch(err => console.log(err))
      }else if(id > 0){
        knexApp.from('bancodados')
              .select('client', 'host', 'database', 'user', 'password')
              .where('id', id)
              .limit(1)
              .then(result => {
                const banco = result[0]

                 require('knex')({   
                  client:         banco.client,
                  connection: {
                         host:     banco.host,
                         database: banco.database,
                         user:     banco.user,
                         password: banco.password
                    }
                  }).seed.run({
                    directory: './migrations/dados/seeds'
                  }) .then(() => console.log('Seeds "%s" complete', banco.database))
                  .catch(err => console.log(err)) 
              })
              .catch(err => console.log('Erro ao buscar banco: '+err))
      } else{
        console.error("É necessário informar o ID do banco na aplicação!") 
      }
})()