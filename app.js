const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');

const Post = require('./models/Post');

const app = express();
const PORT = 3000;

// connected Db
mongoose.connect('mongodb://localhost/cleanblog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routers
const postRouters = require('./routes/postRoute');
const { Mongoose } = require('mongoose');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTERSS
app.use(postRouters);

app.listen(PORT, () => {
  console.log(`Listining port ${PORT}`);
});
