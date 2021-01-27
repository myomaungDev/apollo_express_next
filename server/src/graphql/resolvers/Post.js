import { ApolloError } from "apollo-server-express";
export default {
  Query: {
    all_posts: async (_, args, { Post }, info) => {
      let result = await Post.find();
      return result;
    },
    get_post_by_id: async (_, { id }, { Post }, info) => {
      let result = await Post.findById(id);
      return result;
    },
  },
  Mutation: {
    createPost: async (_, { NewPost }, { Post, isAuth, user }, info) => {
      let result = await Post.create(NewPost);

      result.author = user._id;
      let success = result.save();
      if (success) {
        return success;
      } else {
        throw new ApolloError("Post create fail");
      }
    },
    updatePostByID: async (_, { UpdatePost, id }, { Post }, info) => {
      let editpost = await Post.findByIdAndUpdate(
        id,
        { ...UpdatePost },
        { new: true }
      );
      return editpost;
    },
    deletePostByID: async (_, { id }, { Post }, info) => {
      let deletepost = await Post.findByIdAndDelete(id);
      return {
        id: deletepost.id,
        message: "Delete Successfully",
        success: true,
      };
    },
  },
};
