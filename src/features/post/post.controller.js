import PostRepo from "./post.repo.js";

export default class PostController {
  constructor() {
    this.repo = new PostRepo();
  }
  createPost = async (req, res) => {
    try {
      const { caption } = req.body;
      const { buffer, mimetype, originalname } = req.file;
      const userId = req.userId;

      const resp = await this.repo.createPost(
        caption,
        buffer,
        mimetype,
        originalname,
        userId
      );

      if (resp.success) {
        console.log("in");
        const {
          post: {
            imageUrl: { name },
            caption,
            likes,
            comments,
            _id,
          },
        } = resp;
        return res.status(201).json({
          success: true,
          post: { image: name, caption, likes, comments, _id },
        });
      }
      return res.status(400).json(resp);
    } catch (error) {
      return res.json({ success: false, error: error.message });
    }
  };
}
