import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-access-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.body.Id = verified.userId;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;
