import commentModel from "./comment.schema.js";
import postModel from "../post/post.scheme.js";

export default class CommentRepo {
  addComment = async (content, userId, postId) => {
    try {
      const post = await postModel
        .findById(postId)
        .populate("comments", "-__v")
        .select("-imageUrl.data -imageUrl.contentType -__v ");

      if (!post) return { success: false, msg: "No post found" };
      const newComment = await commentModel.create({ content, userId });
      post.comments.push(newComment._id);
      await post.save();
      console.log(post);
      return {
        success: true,
        msg: "Comment added",
      };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  getComments = async (postId) => {};

  updateComment = async (comment, userId, postId) => {};

  deleteComment = async (commentId, userId, postId) => {};
}
