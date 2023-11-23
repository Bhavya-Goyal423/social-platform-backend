import express from "express";
import UserController from "./user.controller.js";
import { auth } from "../../middleware/jwtAuth.js";

const userRouter = express();
const userController = new UserController();

userRouter.route("/signup").post(userController.userSignUp);
userRouter.route("/signin").post(userController.userSignIn);
userRouter.route("/logout").get(auth, userController.userLogOut);
userRouter.route("/logout-all-devices").get(auth, userController.userLogOutAll);
userRouter.route("/get-details/:userId").get(userController.getDetails);
userRouter.route("/get-all-details/").get(auth, userController.getAllDetails);
userRouter
  .route("/update-details/:userId")
  .put(auth, userController.updateDetails);

export default userRouter;
