// module.export =
const pg = require ('pg');
const settings = require('./settings');

const knex = require('knex')({
  client: 'pg',
  connection:{
   user: settings.db_user,
   password: settings.db_pass,
   database: settings.db_name,
   host: settings.db_host
  }
});

const first_name = process.argv[2];
const last_name = process.argv[3];
const email = process.argv[4];
const password = process.argv[5]

knex.insert({first_name: first_name, last_name: last_name, email: email, password:  password}).into('users')
.then(function(result){
  console.log(result);
});
