const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPost = async (req, res) => {
  const page = req.query.page || 1;
  const postPerPage = 3;

  const totalPosts = await Post.find().countDocuments();

  const posts = await Post.find({})
    .sort('-dataCreated')
    .skip((page - 1) * postPerPage)
    .limit(postPerPage);
  res.render('index', {
    posts: posts,
    current: page,
    pages: Math.ceil(totalPosts / postPerPage),
  });

  // console.log(req.query);
  // const posts = await Post.find({}).sort('-dataCreated');
  // res.render('index', {
  //   posts: posts,
  // });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Post.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + post.image;
  fs.unlinkSync(deletedImage);
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
