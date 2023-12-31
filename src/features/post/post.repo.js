import postModel from "./post.scheme.js";
import mongoose from "mongoose";
export default class PostRepo {
  createPost = async (caption, data, contentType, name, userId) => {
    try {
      const newPost = await postModel.create({
        imageUrl: { data, contentType, name },
        caption,
        userId,
      });
      return { success: true, post: newPost };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  getPostById = async (postId) => {
    try {
      const post = await postModel
        .findById(postId)
        .populate("comments", "-__v")
        .populate("likes", "-__v");
      if (!post) return { success: false, msg: "Post not found" };
      const {
        imageUrl: { name },
        caption,
        likes,
        comments,
      } = post;
      return { status: true, post: { name, caption, likes, comments } };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  getPostByUser = async (userId) => {
    try {
      const post = await postModel
        .find({
          userId: new mongoose.Types.ObjectId(userId),
        })
        .populate("comments", "-__v")
        .populate("likes", "-__v")
        .select("-imageUrl.data -imageUrl.contentType -__v ");
      if (!post) return { success: false, msg: "Post not found" };
      console.log(post);

      return { status: true, post };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };
  getAllPost = async () => {
    try {
      const post = await postModel
        .find({})
        .populate("comments", "-__v")
        .populate("likes", "-__v")
        .select("-imageUrl.data -imageUrl.contentType -__v ");
      if (!post) return { success: false, msg: "Post not found" };
      return { status: true, post };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  deletePost = async (postId, userId) => {
    try {
      const post = await postModel.findById(postId);
      if (!post) return { success: false, msg: "Post not found" };

      if (post.userId.toString() === userId.toString()) {
        const deletedPost = await postModel.deleteOne({
          _id: new mongoose.Types.ObjectId(postId),
          userId: new mongoose.Types.ObjectId(userId),
        });
        return { success: true, msg: "Post deleted" };
      } else
        return {
          success: false,
          msg: "You can only delete post created by you",
        };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  updatePost = async (caption, data, contentType, name, userId, postId) => {
    try {
      const post = await postModel.findById(postId);
      if (!post) return { success: false, msg: "Post not found" };

      if (post.userId.toString() === userId.toString()) {
        const updateFields = {};

        if (
          data !== undefined &&
          contentType !== undefined &&
          name !== undefined
        ) {
          updateFields.imageUrl = { data, contentType, name };
        }

        if (caption !== undefined) {
          updateFields.caption = caption;
        }

        const updatedPost = await postModel
          .findOneAndUpdate({ _id: postId }, updateFields, { new: true })
          .populate("comments", "-__v")
          .populate("likes", "-__v")
          .select("-imageUrl.data -imageUrl.contentType -__v ");

        return { success: true, msg: "Post updated", post: updatedPost };
      } else {
        return {
          success: false,
          msg: "You can only update posts created by you",
        };
      }
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };
}
