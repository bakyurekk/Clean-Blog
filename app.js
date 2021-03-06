const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

require('dotenv').config();
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 5000;

// connected Db
mongoose  
  .connect("mongodb+srv://bakyurekk:Ba3026933@cluster0.quzig.mongodb.net/clean-blog-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

// Routers
const postRouters = require('./routes/postRoute');
const pageRouters = require('./routes/pageRoute');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTERSS
app.use(postRouters);
app.use(pageRouters);

app.listen(PORT, () => {
  console.log(`Listining port ${PORT}`);
});
