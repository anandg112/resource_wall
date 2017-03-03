
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('movies').insert({id: 1, youtubeid: 'Yqq91WC3XWk', title: 'test', description: 'test', likes: 1, id_user: 1, tag_id: 1}),
        knex('movies').insert({id: 2, youtubeid: 'dQw4w9WgXcQ', title: 'test2', description: 'test2', likes: 15, id_user: 1, tag_id: 1}),
        knex('movies').insert({id: 3, youtubeid: 'w4iu5FMaR2o', title: 'test3', description: 'test3', likes: 3, id_user: 2, tag_id: 2}),
        knex('movies').insert({id: 4, youtubeid: 'ytRDyRvN6gk', title: 'test4', description: 'test4', likes: 8, id_user: 2, tag_id: 2}),
      ]);
    });
};





