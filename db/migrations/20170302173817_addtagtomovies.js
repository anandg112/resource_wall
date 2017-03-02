exports.up = function(knex, Promise) {
  return knex.schema.table("movies", function(table){
    table.integer("tag_id").references("tags.id");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", function(table){
    table.dropColumn("tags_id");

  })
};
