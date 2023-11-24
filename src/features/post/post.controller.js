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
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  getPostById = async (req, res) => {
    try {
      const resp = await this.repo.getPostById(req.params.postId);

      if (resp.success) {
        return res.status(200).json(resp);
      } else return res.status(400).json(resp);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  getPostByUser = async (req, res) => {
    try {
      const resp = await this.repo.getPostByUser(req.userId);

      if (resp.success) {
        return res.status(200).json(resp);
      } else return res.status(400).json(resp);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  getAllPost = async (req, res) => {
    try {
      const resp = await this.repo.getAllPost();

      if (resp.success) {
        return res.status(200).json(resp);
      } else return res.status(400).json(resp);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  deletePost = async (req, res) => {
    try {
      const resp = await this.repo.deletePost(req.params.postId, req.userId);

      if (resp.success) {
        return res.status(200).json(resp);
      } else return res.status(400).json(resp);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };
}
