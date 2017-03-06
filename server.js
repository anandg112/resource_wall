"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const cookieSession = require("cookie-session");

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));


app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


// app.get("/", (req, res) => {
//   res.render("show_tile");
// });
//
//
// app.get("/", (req, res) => {
//   res.render("show_tile");
// });


app.get("/users", (req, res) => {
  knex
    .select('*')
    .from('users')
    .then((results) => {
      //res.json(results);
      console.log(results);
      var templateVars = {results: results};
      res.render('users.ejs', templateVars);
    })
    .catch((error) => {
      console.log(error);
    });
});

// app.get("/movies", (req, res) => {
//   knex
//     .select('*')
//     .from('movies')
//     .then((results) => {
//       res.json(results);
//     })
//     .catch((error) => {
//     console.log(error);
//     });
// });


// app.get("/show_tile/:index", (req, res) => {
//   var urlObject = {url: urlDatabase[req.params.index].substring(urlDatabase[req.params.index].lastIndexOf("=") + 1).split("&")[0]};
//     res.render("show_tile", urlObject);
// });

// app.get('/show_tile/:user', (req, res) => {
//   var templateVars = {user: user};
//     res.render("show_tile", user);
// });

app.get("/register", (req, res) =>{
  res.render("index");
});


app.post('/register', function(req, res) {
  const first_name = req.body.first_name;
  const last_name  = req.body.last_name;
  const email      = req.body.email;
  const password   = req.body.password;
  knex.insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
  })
  .into('users')
  .then(function(result){
    req.session = { email };
    res.redirect("/");
  })
  .catch(function(error){
    res.send("Failed");
  });
});

app.get("/login", (req, res) =>{
  res.render("index");
});

app.post('/login', function(req, res) {
  const {email, password} = req.body;
  console.log(req.body)
   knex.select("email", "password")
   .from('users')
   .where('email', '=', email)
   .then(function(result){

     req.session = { email };
     res.redirect("/movies")
   })
   .catch(function(error){
   console.log(error);
   });
})

app.post("/logout", (req, res) =>{
  req.session = null;
  res.redirect("/")
})

// app.get('/show_tile/:index', (req, res) =>{
//   var urlObject = {url: urlDatabase[req.params.index]};
//   console.log(urlObject);
//   console.log(urlDatabase);
//   res.render("show_tile", urlObject);
// });

app.get("/movies/:id", (req, res) => {
  knex
    .select('*')
    .from('movies')
    .where('youtubeid', req.params.id)
    .then((results) => {
      var templateVars = {id: req.params.id, title: results[0].title, description: results[0].description};
      res.render('tile.ejs', templateVars);
    })
    .catch((error) => {
      console.log(error);
    });
});

// app.get("/users/:id", (req, res) => {
//   knex('movies')
//     .where('id_user', req.params.id)
//     .then((results) => {
//       var templateVars = {user_id: req.params.id, movies: results};
//       res.render('user-movies.ejs', templateVars);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
// app.get("/user/:likes", (req, res) =>{
//   res.
// })

app.post("/users/:likes", (req,res) =>{
const {likes, id} = req.body;
  knex("movies")
  .where( "id", "=", id)
  .increment("likes", 1)
  .then((implement) =>{
    res.send("OK");
  })
  .catch((error) => {
    console.log(error);
  });
});


app.get("/movies", (req, res) => {
  knex('movies')
    .innerJoin('users', 'movies.id_user', '=', 'users.id')
    .orderBy('likes', 'desc')
    .limit(3)
    .then((results) => {
      var templateVars = {userMovies: results, email: results[0].email, userID: results[0].id_user };
      res.render('most-liked.ejs', templateVars);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/movies/users/:id", (req, res) => {
  knex('movies')
    .innerJoin('users','movies.id_user', '=', 'users.id')
    .orderBy('likes', 'desc')
    .where('users.id', req.params.id)
    .then((results) => {
      var templateVars = {user_id: req.params.id, userMovies: results, firstName: results[0].first_name, userID: req.params.id };
      res.render("liked-vid-user.ejs", templateVars);
    })
    .catch((error) => {
      console.log(error);
    });
});

// app.get("/search-user", (req, res) => {
//     res.render('search-user.ejs');
// });

//Macky: Line 150 to line 200 is mine. Don't touch.
// app.get("/test", (req, res) => {
// res.render(/test.ejs)
// }

app.get("/input", (req,res) => {
res.render("input")
})

app.post("/input", (req,res) => {
  knex
    .select('id')
    .from('users')
    .where('email', req.session.email)
    .then((results) => {
      const id_user = results;
        const youtubeid = req.body.video.slice(-11);
        const title = req.body.title;
        const description = req.body.description;
        const tag_id = req.body.tags;

          knex('movies')
           .insert({

            youtubeid: youtubeid,
            title: title,
            description: description,
            id_user: id_user[0].id,
            tag_id: tag_id,
            likes: 0
          })

          .then(function(result){
          res.redirect("/movies");
        })
        .catch(function(error){
        console.log(error);
      })
    })
  })


// knex.insert({
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password: password
//   })
//   .into('users')
//   .then(function(result){
//     req.session = { email };
//     res.send("OK");
//   })
//   .catch(function(error){
//     res.send("Failed");


app.get("/search", (req, res) => {
res.render("partials/search")
// console.log(req.body.search)
})

// app.post("/search", (req, res) => {
//   const tag = req.body.tag
//   console.log(tag)
// res.redirect("/tags/req.body.search")
// })


app.get("/tags/:tags", (req, res) => {
  knex('movies')
    .join('tags', 'movies.tag_id', '=', 'tags.id')
    .select('movies.youtubeid', 'movies.title', 'movies.likes', 'movies.description')
    .where('name', req.params.tags)
    // .select('youtubeid')
    // .from('movies')
    // .join('tags', {'tags.id': 'movies.tag_id'})
    // // .from('movies')
    // // .join('tags', 'tag_id', 'id')
    // .where('tags.name', 'req.params.tags')
    .then((results) => {
      knex
        .select('id')
        .from('users')
        .where('email', req.session.email)
        .then((results2) => {
          console.log(results2)

          var templateVars = {tags: req.params.tags, youtubeTags: results, userID: results2[0].id};
          console.log(templateVars)
          res.render("search-tags.ejs", templateVars);
    })
    .catch((error) => {
    console.log(error);
    });
  });
})



 // SELECT youtubeid FROM MOVIES JOIN TAGS ON (tag_id = movies.id) WHERE tags.name = 'music'

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
