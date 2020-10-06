
exports.up = function(knex, Promise) {
    const name = 'produtos';
    return knex.schema.createTable(name, table => {
        table.increments('id').primary()
        table.string('codigo')
        table.string('situacao', 1).notNull()  
        table.integer('grupo_id').unsigned().references('id').inTable('grupos')
        table.string('nome').notNull()
        table.string('descricao')
        table.string('imagem')
        table.text('campos')
        table.text('detalhes')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('delete_at').nullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('produtos')
};
