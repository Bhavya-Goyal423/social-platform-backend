import postModel from "./post.scheme.js";

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
      return { success: false, error: error.message };
    }
  };
}
