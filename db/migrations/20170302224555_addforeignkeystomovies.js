exports.up = function(knex, Promise) {
  return knex.schema.table("movies", function(table){
    table.integer('id_user')
    .references("users.id")
    .onDelete('CASCADE');
    table.integer('tag_id')
    .references("tags.id")
    .onDelete('CASCADE');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", function(table){
    table.dropColumn("id_user");
    table.dropColumn("tag_id");

  })
};
