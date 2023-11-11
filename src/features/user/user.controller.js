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
          resp: resp.data,
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

    const user = await this.repo.findUserByEmail(email);
    console.log(user);
    if (user.success) {
      if (user.user === null) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid credentials" });
      } else {
        const verifyPass = await verifyPassword(password, user.user.password);
        if (!verifyPass) {
          return res
            .status(400)
            .json({ success: false, msg: "Invalid credentials" });
        } else {
          const token = jwt.sign(
            { userId: user._id, user },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res
            .cookie("jwtToken", token, {
              maxAge: 1 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .json({ success: true, msg: "user login successful", token });
        }
      }
    } else {
      return res.status(400).json(user);
    }
  };
}
