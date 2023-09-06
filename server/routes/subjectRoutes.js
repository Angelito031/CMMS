import express from "express";
import {
  deleteSubject,
  getSubject,
  setSubject,
  updateSubject,
} from "../controllers/subjectControllers.js";
import { authToken } from "../middlewares/authToken.js";
import { authUserLevel } from "../middlewares/authUserLevel.js";

const subjectRoutes = express.Router();

subjectRoutes
  .route("/")
  .get(authToken, getSubject)
  .post(authToken, authUserLevel, setSubject);
subjectRoutes
  .route("/:id")
  .patch(authToken, authUserLevel, updateSubject)
  .delete(authToken, authUserLevel, deleteSubject);

export default subjectRoutes;
