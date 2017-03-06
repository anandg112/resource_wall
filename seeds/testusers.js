
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, email: 'test@test.com', password: 'test', first_name: 'test', last_name: 'test'}),
        knex('users').insert({id: 2, email: 'example@example.com', password: 'example', first_name: 'example', last_name: 'example'}),
        knex('users').insert({id: 3, email: 'user@user.com', password: 'user', first_name: 'user', last_name: 'user'}),
        knex('users').insert({id: 4, email: 'car@car.com', password: 'car', first_name: 'car', last_name: 'car'}),
      ]);
    });
};
