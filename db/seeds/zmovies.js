
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
        knex('movies').insert({id: 5, youtubeid: 'aZcoTQuYUqQ', title: 'Gordon Ramsay Steak', description: 'test4', likes: 4, id_user: 3, tag_id: 4}),
        knex('movies').insert({id: 6, youtubeid: 'SQuyOwNtAVM', title: 'Gordon Ramsay Salmon', description: 'Gordon Ramsay cooks salmon', likes: 13, id_user: 3, tag_id: 4}),
        knex('movies').insert({id: 7, youtubeid: 'EZfXa8vO8N8', title: 'Jamie Oliver', description: 'Jamie Oliver cooks', likes: 13, id_user: 1, tag_id: 4}),
        knex('movies').insert({id: 8, youtubeid: 'YxiqHlINZGI', title: 'Learn The Fundamentals of CARPENTRY from ANTHONY GILARDI', description: 'Carpentry for Beginners!', likes: 1, id_user: 4, tag_id: 7}),
      ]);
    });
};





