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

// app.get("/", (req, res) => {
//   res.render("show_tile");
// });

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
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
    console.log(error);
    });
});

app.get("/movies/:id", (req, res) => {
  knex
    .select('*')
    .from('movies')
    .where('youtubeid', req.params.id)
    .then((results) => {
      //console.log(results);
      //console.log(results[0]);

      var templateVars = {id: req.params.id, title: results[0].title, description: results[0].description};
      res.render('tile.ejs', templateVars);
    })
    .catch((error) => {
    console.log(error);
    });
});

app.get("/users/:id", (req, res) => {
  knex
    .select('*')
    .from('movies')
    .where('id_user', req.params.id)
    .then((results) => {
      console.log(results);
      var templateVars = {user_id: req.params.id, movies: results};
      res.render('user-movies.ejs', templateVars);
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

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
