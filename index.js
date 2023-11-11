import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("Welcome to the server");
});

export default server;
