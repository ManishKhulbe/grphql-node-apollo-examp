const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
