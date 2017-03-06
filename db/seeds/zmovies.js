
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('movies').insert({id: 1, youtubeid: 'Yqq91WC3XWk', title: 'Justin Beiber on BBC', description: 'Awesome Song!', likes: 1, id_user: 1, tag_id: 1}),
        knex('movies').insert({id: 2, youtubeid: 'dQw4w9WgXcQ', title: 'Rick', description: 'Roll', likes: 15, id_user: 1, tag_id: 1}),
        knex('movies').insert({id: 3, youtubeid: 'w4iu5FMaR2o', title: 'Daryl: Ambitious Card', description: 'RIP :(', likes: 3, id_user: 2, tag_id: 2}),
        knex('movies').insert({id: 4, youtubeid: 'ytRDyRvN6gk', title: 'Yu Ho Jin at FISM', description: 'My favorite Magic Act! So Dramajesty!', likes: 13, id_user: 2, tag_id: 2}),
        knex('movies').insert({id: 5, youtubeid: 'aZcoTQuYUqQ', title: 'Gordon Ramsay Steak', description: 'beefy!', likes: 4, id_user: 3, tag_id: 4}),
        knex('movies').insert({id: 6, youtubeid: 'SQuyOwNtAVM', title: 'Gordon Ramsay Salmon', description: 'Gordon Ramsay cooks salmon', likes: 12, id_user: 3, tag_id: 4}),
        knex('movies').insert({id: 7, youtubeid: 'EZfXa8vO8N8', title: 'Jamie Oliver', description: 'Jamie Oliver cooks', likes: 10, id_user: 5, tag_id: 4}),
        knex('movies').insert({id: 8, youtubeid: 'YxiqHlINZGI', title: 'Learn The Fundamentals of CARPENTRY from ANTHONY GILARDI', description: 'Carpentry for Beginners!', likes: 1, id_user: 4, tag_id: 7}),
        knex('movies').insert({id: 9, youtubeid: 'emm3TCDWOUU', title: 'LCar Repair Marathon', description: 'Car Repair!!', likes: 6, id_user: 5, tag_id: 5}),
        knex('movies').insert({id: 10, youtubeid: 'CHaTWk6uqd8', title: 'How to Adjust Gears & Derailleurs | Bicycle Repair', description: 'Summers almost here, lets learn how to repair a bike!', likes: 10, id_user: 6, tag_id: 8}),
        knex('movies').insert({id: 11, youtubeid: 'J7QFNimcLQM', title: 'More Bike Stuff!', description: 'fixing gears', likes: 2, id_user: 6, tag_id: 8}),
        knex('movies').insert({id: 12, youtubeid: 'zZ8aqP2NWk8', title: 'Arnold: Pumping Iron', description: 'look at those pecs!', likes: 3, id_user: 7, tag_id: 9}),
        knex('movies').insert({id: 13, youtubeid: 'CorfPVWZGfI', title: 'Damn Son!', description: 'So buff, these guys!', likes: 14, id_user: 7, tag_id: 9}),
      ]);
    });
};





