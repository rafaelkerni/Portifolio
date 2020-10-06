
exports.up = function(knex, Promise) {
    const name = 'empresas';
    return knex.schema.createTable(name, table => {
        table.increments('id').primary()
        table.string('nome')
        table.string('fantasia')
        table.string('cnpj').notNull()
        table.integer('responsavel_id')
        table.string('situacao')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('delete_at').nullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('empresas')
};
