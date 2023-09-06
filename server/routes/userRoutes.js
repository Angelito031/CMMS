import express from "express";
import {
  deleteUser,
  getUser,
  getUserById,
  loginUser,
  setUser,
  updateUser,
} from "../controllers/userControllers.js";
import { authToken } from "../middlewares/authToken.js";

const userRoutes = express.Router();

userRoutes.route("/").get(authToken, getUser).post(setUser);
userRoutes.route("/login").post(loginUser);
userRoutes
  .route("/:id")
  .get(authToken, getUserById)
  .patch(authToken, updateUser)
  .delete(authToken, deleteUser);

export default userRoutes;
