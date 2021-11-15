
exports.up = function(knex) {
    return knex.schema.createTable('tweets', table => {
        table.increments('id').primary();
        table.text('content').notNullable();
        table.boolean('is_anonymous');
        table.integer('likes').notNullable().default(0);
        table.integer('user_id').unsigned().nullable()
        
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table.foreign('user_id').references('users.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tweets');
};
