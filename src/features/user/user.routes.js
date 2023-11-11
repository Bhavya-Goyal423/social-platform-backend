import express from "express";
import UserController from "./user.controller.js";
import { auth } from "../../middleware/jwtAuth.js";

const userRouter = express();
const userController = new UserController();

userRouter.route("/signup").post(userController.userSignUp);
userRouter.route("/signin").post(userController.userSignIn);
userRouter.route("/logout").get(auth, userController.userLogOut);

export default userRouter;
