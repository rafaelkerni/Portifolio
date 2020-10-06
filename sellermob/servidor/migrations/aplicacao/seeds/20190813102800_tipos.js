
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const tabela = 'tipos'
  return knex(tabela).del()
    .then(function () {
      // Inserts seed entries
      return knex(tabela).insert([
        {id: 1, descricao: 'ADM', origem: 'P'},
        {id: 2, descricao: 'Cliente', origem: 'P'},
        {id: 3, descricao: 'Entregador', origem: 'P'}
      ]);
    }).catch(err => console.log(err));
};
