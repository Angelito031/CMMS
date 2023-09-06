import express from "express";
import {
  deleteGrade,
  getGrade,
  setGrade,
  updateGrade,
} from "../controllers/gradeControllers.js";
import { authToken } from "../middlewares/authToken.js";

const gradeRoutes = express.Router();

gradeRoutes.route("/").get(authToken, getGrade).post(authToken, setGrade);
gradeRoutes
  .route("/:id")
  .patch(authToken, updateGrade)
  .delete(authToken, deleteGrade);

export default gradeRoutes;
