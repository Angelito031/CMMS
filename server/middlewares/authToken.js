import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(400).json({ message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized, no token" });
  }
};
