
exports.up = function(knex, Promise) {
  return knex.schema.table('movies', function(table){
    table.renameColumn("link", "youtubeid")
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.table('movies', function(table){
    table.renameColumn("youtubeid", "link")
  })
};
