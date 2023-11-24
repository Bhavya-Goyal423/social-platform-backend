import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", commentRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the server");
});

export default server;
