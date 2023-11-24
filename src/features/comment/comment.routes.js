import express from "express";
import CommentController from "./comment.controller.js";
import { auth } from "../../middleware/jwtAuth.js";

const commentRouter = express();
const commentController = new CommentController();

commentRouter
  .route("/:postId")
  .post(auth, commentController.addComment)
  .get(commentController.getComments);

commentRouter
  .route("/:commentId")
  .put(auth, commentController.updateComment)
  .delete(auth, commentController.deleteComment);

export default commentRouter;
