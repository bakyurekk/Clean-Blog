const Post = require('../models/Post');

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageTitle: 'About',
  });
};

exports.getPostPage = (req, res) => {
  res.status(200).render('post', {
    pageTitle: 'Post',
  });
};

exports.getAddPostPage = (req, res) => {
  res.status(200).render('add_post', {
    pageTitle: 'Add Post',
  });
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.status(200).render('edit', {
    pageTitle: 'Edit Post',
    post,
  });
};
