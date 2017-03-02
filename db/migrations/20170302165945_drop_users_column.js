
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn("name")
  })
};

exports.down = function(knex, Promise) {
return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
  });
};
