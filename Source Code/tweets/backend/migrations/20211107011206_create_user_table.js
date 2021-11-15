
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('avatar').notNullable();
        table.string('phone');
        table.string('address');
        table.string('password').notNullable();
        table.string('full_name');

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
