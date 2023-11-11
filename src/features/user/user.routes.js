import express from "express";
import UserController from "./user.controller.js";

const userRouter = express();
const userController = new UserController();

userRouter.route("/signup").post(userController.userSignUp);

export default userRouter;
