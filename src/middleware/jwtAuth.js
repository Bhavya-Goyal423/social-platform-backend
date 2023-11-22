import jwt from "jsonwebtoken";
import userModel from "../features/user/user.schema.js";

export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;

  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, data) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, msg: "unauthorized! login to continue" });
    else {
      const account = await userModel.findOne({ _id: data.userId });
      const isLoginVerified = account.login?.some(
        (token) => token === jwtToken
      );
      if (!isLoginVerified)
        return res.json({
          success: false,
          msg: "login expired! login again to continue",
        });
      req.user = data.user;
      req.userId = data.userId;
      req.token = jwtToken;
      next();
    }
  });
};
