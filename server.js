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

app.get("/", (req, res) => {
  res.render("show_tile");
});

// app.get("/", (req, res) => {
//   res.render("show_tile");
// });

var index = 0;
var urlDatabase = {
   0: 'qyyJKd-zXRE',
   1: 'Lgn1hV3weE8',
   2: 'PSVN4YZGaeU'
};
// var users = {};


app.get("/get_tile", (req, res) => {
  res.render("get_tile");
});

app.post("/show_tile", (req, res) => {
  var url = req.body.insert;
  urlDatabase[index] = url.substring(urlDatabase[req.params.index].lastIndexOf("=") + 1).split("&")[0];
  res.redirect("/show_tile/" + index);
  index += 1;
});

app.get("/show_tile/:index", (req, res) => {
  var urlObject = {url: urlDatabase[req.params.index].substring(urlDatabase[req.params.index].lastIndexOf("=") + 1).split("&")[0]};
    res.render("show_tile", urlObject);
});

app.get('/show_tile/:user', (req, res) => {
  var templateVars = {user: user};
    res.render("show_tile", user);
});

app.get("/register", (req, res) =>{
  res.render("index");
});


app.post('/register', function(req, res) {
  const {first_name, last_name, email, password} = req.body;
  console.log(req.body)
  knex.insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
  })
  .into('users')
  .then(function(result){
    // if(email === email){
    //
    // }
    req.session = { email };
    res.redirect("/");
  })
  .catch(function(error){
  console.log(error);
  });
});

app.get("/login", (req, res) =>{
  res.render("index");
});

app.post('/login', function(req, res) {
  const {email, password} = req.body;
   knex.select(email, password)
   .from('users')
   .then(function(result){

     req.session = { email };
     res.redirect("/get_tile")
   })
   .catch(function(error){
   console.log(error);
   });
})

app.post("/logout", (req, res) =>{
  req.session = null;
  res.redirect("/")
})

app.get('/show_tile/:index', (req, res) =>{
  var urlObject = {url: urlDatabase[req.params.index]};
  console.log(urlObject);
  console.log(urlDatabase);
  res.render("show_tile", urlObject);
});

app.get("/show_tiles", (req, res) => {
  console.log(urlDatabase);
  var urls = {urls: urlDatabase};
  res.render("show_tiles", urls);
});

//app.get('/show_tile/:user', (req, res) => {
//   var templateVars = {user: user};
//   res.render("show_tile", user);
// });


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
