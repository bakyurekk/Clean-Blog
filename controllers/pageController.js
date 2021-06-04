const Post = require('../models/Post');

exports.getAboutPage = (req, res) => {
  res.render('about', {
    pageTitle: 'About',
  });
};

exports.getPostPage = (req, res) => {
  res.render('post', {
    pageTitle: 'Post',
  });
};

exports.getAddPostPage = (req, res) => {
  res.render('add_post', {
    pageTitle: 'Add Post',
  });
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    pageTitle: 'Edit Post',
    post,
  });
};
