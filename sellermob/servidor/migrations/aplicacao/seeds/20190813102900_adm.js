
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const tabela = 'usuarios'
  return knex(tabela).del()
    .then(function () {
      // Inserts seed entries
      return knex(tabela).insert([
        {id: 1, email: 'catalogo@c.com.br', senha: '$2a$10$0xMvndEacYkCSOWgOA/0JumIPkv5UScYqHY2VzToyn.ZG60XdbQvS', 'nome': 'Catalogo Usuário', ativo: '1', tipo_id: '1', empresa_id: '1'},
      ]);
    })
    .catch(err => console.log(err))
};
