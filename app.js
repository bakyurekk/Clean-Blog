const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

PORT = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

// ROUTERSS
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/add-post', (req, res) => {
  res.render('add_post');
});

app.listen(PORT, () => {
  console.log(`Listining port ${PORT}`);
});
