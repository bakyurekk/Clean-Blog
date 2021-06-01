const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  detail: String,
  image: String,
  dataCreated:{
    type:Date,
    default: Date.now()
  }
});

const Post = mongoose.model('Photo', PostSchema);

module.exports = Post;
