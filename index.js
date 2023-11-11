import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import cookieParser from "cookie-parser";

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the server");
});

export default server;
