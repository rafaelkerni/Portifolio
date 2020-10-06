
exports.up = function(knex, Promise) {
    return knex.schema.table('usuarios', table => {
        table.integer('permissoes');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('usuarios', table => {
        table.dropColumn('permissoes');
    });
};
