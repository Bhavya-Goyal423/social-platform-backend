import express from "express";
import PostController from "./post.controller.js";
import upload from "../../middleware/imageUpload.js";

const postRouter = express();
const postController = new PostController();

postRouter
  .route("/")
  .post(upload.single("imageUrl"), postController.createPost);

export default postRouter;
