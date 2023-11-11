import userModel from "./user.schema.js";

export default class UserRepo {
  findUserByEmail = async (email) => {
    try {
      const user = await userModel.findOne({ email });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  createUser = async (userData) => {
    try {
      const user = await userModel.create(userData);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}
