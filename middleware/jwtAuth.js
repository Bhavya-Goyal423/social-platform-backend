import jwt from "jsonwebtoken";

const auth = async (req, res) => {
  const { jwtToken } = req.cookies;

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, msg: "unauthorized! login to continue" });
    else {
      req.user = data.user;
      next();
    }
  });
};
