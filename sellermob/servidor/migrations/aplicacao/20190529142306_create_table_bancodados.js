
exports.up = function(knex, Promise) {
    const name = 'bancodados';
    return knex.schema.createTable(name, table => {
        table.increments('id').primary()
        table.integer('empresa_id').unsigned().references('id').inTable('empresas').notNull()
        table.string('tipo')
        table.string('client').notNull()
        table.string('host')
        table.string('user').notNull()
        table.string('password').notNull()
        table.string('database').notNull()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('delete_at').nullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bancodados')
};