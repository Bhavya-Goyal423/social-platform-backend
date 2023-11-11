import express from "express";
import userRouter from "./src/features/user/user.routes.js";

const server = express();

server.use(express.json());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the server");
});

export default server;
