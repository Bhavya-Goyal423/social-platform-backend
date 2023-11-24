import express from "express";
import PostController from "./post.controller.js";
import upload from "../../middleware/imageUpload.js";
import { auth } from "../../middleware/jwtAuth.js";

const postRouter = express();
const postController = new PostController();

postRouter
  .route("/")
  .post(auth, upload.single("imageUrl"), postController.createPost)
  .get(auth, postController.getPostByUser);

postRouter.route("/all").get(postController.getAllPost);

postRouter
  .route("/:postId")
  .get(postController.getPostById)
  .delete(auth, postController.deletePost)
  .put(auth, upload.single("imageUrl"), postController.updatePost);

export default postRouter;
