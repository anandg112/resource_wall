"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

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

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("show_tile");
});

var index = 0;
// var urlDatabase = {
//    0: 'qyyJKd-zXRE',
//    1: 'Lgn1hV3weE8',
//    2: 'PSVN4YZGaeU'
// };
// var users = {};

app.get("/users", (req, res) => {
  knex
    .select('*')
    .from('users')
    //.where('youtubeid', 'Yqq91WC3XWk')
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/movies", (req, res) => {
  knex
    .select('*')
    .from('movies')
    //.where('youtubeid', 'Yqq91WC3XWk')
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
    console.log(error);
    });
});

app.get("/movies/:id", (req, res) => {
  knex
    .select('youtubeid')
    .from('movies')
    .where('youtubeid', 'Yqq91WC3XWk')
    .then((results) => {
      res.render('tile.ejs');
    })
    .catch((error) => {
    console.log(error);
    });
});

app.get("/users/:id", (req, res) => {
  knex
    .select('*')
    .from('users')
    .where('youtubeid', 'Yqq91WC3XWk')
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
    console.log(error);
    });
});
// app.get("/get_tile", (req, res) => {
//   res.render("get_tile");
// });
//
// app.post("/show_tile", (req, res) => {
//   var url = req.body.url;
//   urlDatabase[index] = url.substring(urlDatabase[req.params.index].lastIndexOf("=") + 1).split("&")[0];
//   res.redirect("/show_tile/" + index);
//   index += 1;
// });
//
// app.get("/show_tile/:index", (req, res) => {
//   var urlObject = {url: urlDatabase[req.params.index]};
//   res.render("show_tile", urlObject);
// });
//
// app.get("/show_tiles", (req, res) => {
//   console.log(urlDatabase);
//   var urls = {urls: urlDatabase};
//   res.render("show_tiles", urls);
// });

//app.get('/show_tile/:user', (req, res) => {
//   var templateVars = {user: user};
//   res.render("show_tile", user);
// });















//Macky: Line 150 to line 200 is mine. Don't touch.
app.get("/search", (req, res) => {
res.render("tags.ejs")
})


app.get("/tags/:tags", (req, res) => {
  knex('movies')
    .join('tags', 'movies.tag_id', '=', 'tags.id')
    .select('movies.youtubeid')
    .where('name', req.params.tags)
    // .select('youtubeid')
    // .from('movies')
    // .join('tags', {'tags.id': 'movies.tag_id'})
    // // .from('movies')
    // // .join('tags', 'tag_id', 'id')
    // .where('tags.name', 'req.params.tags')
    .then((results) => {
      res.json(results);
      // console.log(results)
      // console.log(req.params())
      // console.log(tags.name)
    })
    .catch((error) => {
    console.log(error);
    });
});




 // SELECT youtubeid FROM MOVIES JOIN TAGS ON (tag_id = movies.id) WHERE tags.name = 'music'


































app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
