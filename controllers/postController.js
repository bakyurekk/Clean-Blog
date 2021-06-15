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
  res.status(200).render('index', {
    pageTitle: 'Index',
    posts: posts,
    current: page,
    pages: Math.ceil(totalPosts / postPerPage),
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    pageTitle: 'Post',
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
  const oldPhoto = post.image.slice(9);

  if (req.files) {
    const newPhoto = req.files.image;
    let delImage = __dirname + '/../public/uploads/' + oldPhoto;
    fs.unlinkSync(delImage);
    let uploadPath = __dirname + '/../public/uploads/' + newPhoto.name;
    newPhoto.mv(uploadPath);
    post.image = '/uploads/' + newPhoto.name;
  } else {
    post.image = '/uploads/' + newPhoto.name;
  }

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
