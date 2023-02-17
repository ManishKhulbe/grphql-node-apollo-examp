const { findByIdAndUpdate } = require("./models/Post.model");
const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    getAllPost: async () => {
      const posts = await Post.find();
      return posts;
    },
    getPost: async (parent, args, context, info) => {
      const { id } = args;
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Ok ! post has been deleted";
    },
    updatePost: async (parent, args, context, info) => {
      const { id, post } = args;
      let updates ={}
      if(args.title){
        updates.title = args.title
      }
      if(args.description){
        updates.description = args.description
      }
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      return updatedPost;
    },
  },
};

module.exports = resolvers;
