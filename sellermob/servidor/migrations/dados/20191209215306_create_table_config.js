
exports.up = function(knex, Promise) {
    const name = 'config';
    return knex.schema.createTable(name, table => {
        table.increments('id').primary()   
        table.string('cor')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('delete_at').nullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('config')
};
