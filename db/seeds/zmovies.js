
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('movies').insert({id: 1, youtubeid: 'Yqq91WC3XWk', title: 'test', description: 'test', likes: 1, id_user: 1, tag_id: 1}),
        knex('movies').insert({id: 2, youtubeid: 'dQw4w9WgXcQ', title: 'test2', description: 'test2', likes: 1, id_user: 1, tag_id: 1})
      ]);
    });
};





