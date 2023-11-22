import { hashPassword, verifyPassword } from "../../utils/passwordHasher.js";
import UserRepo from "./user.repo.js";
import jwt from "jsonwebtoken";
export default class UserController {
  constructor() {
    this.repo = new UserRepo();
  }

  userSignUp = async (req, res) => {
    try {
      let { name, email, password, gender } = req.body;
      const hashedPassword = await hashPassword(password);

      if (hashedPassword.success) {
        password = hashedPassword.pass;
      } else {
        throw new Error("Something went wrong in hashing");
      }

      const resp = await this.repo.createUser({
        name,
        email,
        password,
        gender,
      });

      if (resp.success) {
        return res.status(201).json({
          success: true,
          msg: "User created successfully",
        });
      } else {
        return res.status(400).json(resp);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Something went wrong with the server! Please try again later",
      });
    }
  };

  userSignIn = async (req, res) => {
    const { email, password } = req.body;
    let token = "";

    const resp = await this.repo.signInUser(email, password);

    if (resp.success) {
      token = jwt.sign(
        {
          userId: resp.user._id,
        },
        process.env.JWT_SECRET
      );

      await this.repo.updateToken(email, token);

      res
        .cookie("jwtToken", token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          overwrite: true,
        })
        .json({
          success: true,
          msg: "user login successful",
          token,
          id: resp.user.id,
        });
    } else {
      res.status(400).json(resp);
    }
  };

  userLogOut = async (req, res) => {
    console.log(req.userId);
    res.clearCookie("jwtToken");

    const resp = await this.repo.logOutUser(req.userId, req.token);

    if (resp.success) {
      return res.status(200).json(resp);
    } else return res.status(400).json(resp);
  };

  userLogOutAll = async (req, res) => {
    res.clearCookie("jwtToken");

    const resp = await this.repo.logOutAllUser(req.userId);

    if (resp.success) {
      return res.status(200).json(resp);
    } else return res.status(400).json(resp);
  };

  getDetails = async (req, res) => {
    const userId = req.params.userId;

    const resp = await this.repo.getUser(userId);

    if (resp.success) {
      const { name, gender, posts } = resp.user;
      return res
        .status(200)
        .json({ success: true, user: { name, gender, posts } });
    } else return res.status(400).json(resp);
  };

  getAllDetails = async (req, res) => {
    const resp = await this.repo.getUser(req.userId);

    if (resp.success) {
      const { name, gender, posts, friends, pendingReq } = resp.user;
      return res.status(200).json({
        success: true,
        user: { name, gender, posts, friends, pendingReq },
      });
    } else return res.status(400).json(resp);
  };
}
