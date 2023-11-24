import CommentRepo from "./comment.repo.js";

export default class CommentController {
  constructor() {
    this.repo = new CommentRepo();
  }

  addComment = async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) return res.status(400).json("No content for the comment");

      const resp = await this.repo.addComment(
        content,
        req.userId,
        req.params.postId
      );

      if (resp.success) {
        return res.status(200).json(resp);
      } else return res.status(400).json(resp);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  getComments = async (req, res) => {};

  updateComment = async (req, res) => {};

  deleteComment = async (req, res) => {};
}
