import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(400).json({ message: "Not Authorized" });

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) return res.status(400).json({ message: "Invalid TOKEN" });
    req.user = user;

    next();
  });
};
