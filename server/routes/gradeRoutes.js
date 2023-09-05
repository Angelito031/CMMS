import express from "express";
import {
  deleteGrade,
  getGrade,
  setGrade,
  updateGrade,
} from "../controllers/gradeControllers.js";

const gradeRoutes = express.Router();

gradeRoutes.route("/").get(getGrade).post(setGrade);
gradeRoutes.route("/:id").patch(updateGrade).delete(deleteGrade);

export default gradeRoutes;
