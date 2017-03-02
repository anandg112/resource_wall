
exports.up = function(knex, Promise) {
  return knex.schema.createTable("movies", function(table) {
    table.increments("id");
    table.string("link");
    table.string("title");
    table.string("description");
    table.string("likes");
    table.integer("id_user").references("users.id");
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("movies");
};
