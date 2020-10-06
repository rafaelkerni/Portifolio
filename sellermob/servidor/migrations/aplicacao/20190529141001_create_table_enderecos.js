
exports.up = function(knex, Promise) {
    const name = 'enderecos';
    return knex.schema.createTable(name, table => {
        table.increments('id').primary()
        table.integer('empresa_id').unsigned().references('id').inTable('empresas').notNull()
        table.integer('usuario_id').unsigned().references('id').inTable('usuarios')
        table.integer('bairro_id').unsigned().references('id').inTable('bairros').notNull()
        table.integer('cidade_id').unsigned().references('id').inTable('cidades')
        table.integer('tipo_id').unsigned().references('id').inTable('tipos').notNull()
        table.string('endereco')
        table.integer('numero')
        table.string('complemento')
        table.integer('cep')
        table.string('referencia')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('delete_at').nullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('enderecos')
};
