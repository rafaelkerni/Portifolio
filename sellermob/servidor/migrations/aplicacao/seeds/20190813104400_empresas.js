
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const tabela = 'empresas'
  return knex(tabela).del()
    .then(function () {
      // Inserts seed entries
      return knex(tabela).insert([
        {id: 1, nome: "4SD", fantasia: "4SD", cnpj: '', responsavel_id: 1, situacao: 'A'},
      ]);
    })
    .catch(err => console.log(err))
};