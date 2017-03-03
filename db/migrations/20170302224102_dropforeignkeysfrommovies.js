
exports.up = function(knex, Promise) {
  return knex.schema.table('movies', function(table){
    table.dropColumn("id_user");
    table.dropColumn("tag_id");
  })
};

exports.down = function(knex, Promise) {
return knex.schema.createTable('users', function (table) {
    table.integer('id_user').references("users.id");
    table.integer('tag_id').references("tags.id");;
  });
};
