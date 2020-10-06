exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const tabela = "paises";
  return knex(tabela)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(tabela).insert([
        { id: 1, nome: "Brasil", sigla: "BR" },
      ]);
    })
    .catch(err => console.log(err));
};
