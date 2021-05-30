const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts: posts,
  });
});
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/post', (req, res) => {
  res.render('post');
});
router.get('/add-post', (req, res) => {
  res.render('add_post');
});

router.post('/add-post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

module.exports = router;
