import express from "express";
import {
  deleteUser,
  getUser,
  getUserById,
  setUser,
  updateUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.route("/").get(getUser).post(setUser);
userRoutes.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default userRoutes;
