import express from "express";
import {
  deleteSubject,
  getSubject,
  setSubject,
  updateSubject,
} from "../controllers/subjectControllers.js";

const subjectRoutes = express.Router();

subjectRoutes.route("/").get(getSubject).post(setSubject);
subjectRoutes.route("/:id").patch(updateSubject).delete(deleteSubject);

export default subjectRoutes;
