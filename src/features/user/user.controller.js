import { hashPassword } from "../../utils/passwordHasher.js";
import UserRepo from "./user.repo.js";

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
      console.log(error);
      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Something went wrong with the server! Please try again later",
      });
    }
  };
}
