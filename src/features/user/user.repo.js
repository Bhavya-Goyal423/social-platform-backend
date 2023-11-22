import { verifyPassword } from "../../utils/passwordHasher.js";
import userModel from "./user.schema.js";

export default class UserRepo {
  createUser = async (userData) => {
    try {
      const user = await userModel.create(userData);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  signInUser = async (email, password) => {
    try {
      const user = await userModel.findOne({ email });
      if (user === null)
        return { success: false, error: "Invalid credentials" };

      const verifyPass = await verifyPassword(password, user.password);
      if (!verifyPass) return { success: false, error: "Invalid credentials" };
      else return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  updateToken = async (email, token) => {
    try {
      const updateUser = await userModel.findOneAndUpdate(
        { email },
        { $push: { login: token } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  logOutUser = async (userId, token) => {
    try {
      const removeToken = await userModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { login: token } },
        { new: true }
      );
      return { success: true, msg: "Logout successfull" };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };
  logOutAllUser = async (userId) => {
    try {
      const account = await userModel.findOne({ _id: userId });
      account.login = [];
      await account.save();
      return { success: true, msg: "Logout successfull" };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  getUser = async (userId) => {
    try {
      const user = await userModel.findOne({ _id: userId });
      if (!user) return { success: false, error: "No user found" };
      else
        return {
          success: true,
          user,
        };
    } catch (error) {
      return { success: false, error: "No user found" };
    }
  };
}
