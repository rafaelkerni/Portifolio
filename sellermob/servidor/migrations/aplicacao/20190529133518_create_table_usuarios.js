
exports.up = function(knex, Promise) {
    const name = 'usuarios';
    return knex.schema.createTable(name, table => {
        table.increments('id').primary()
        table.string('email').notNull().unique()
        table.string('senha').notNull()
        table.integer('pessoa_id')
        table.integer('empresa_id')
        table.string('nome').notNull()
        table.string('sobrenome')
        table.boolean('ativo').notNull()
        table.integer(`tipo_id`).unsigned().references(`id`).inTable(`tipos`).notNull()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('delete_at').nullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios')
};
