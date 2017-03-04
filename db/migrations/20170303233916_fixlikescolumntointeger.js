
exports.up = function(knex, Promise) {
  return knex.schema.table('movies', function(table){
    table.dropColumn("likes");
  })
};

exports.down = function(knex, Promise) {
return knex.schema.createTable('movies', function (table) {
    table.integer('likes');
  });
};
