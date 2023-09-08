import express from "express";
import { authToken } from "../middlewares/authToken.js";
import { authUserLevel } from "../middlewares/authUserLevel.js";
import {
  deleteFeedback,
  getFeedback,
  setFeedback,
  updateFeedback,
} from "../controllers/feedbackControllers.js";

const feedbackRoutes = express.Router();

feedbackRoutes
  .route("/")
  .get(authToken, authUserLevel, getFeedback)
  .post(authToken, setFeedback);
feedbackRoutes
  .route("/:id")
  .patch(authToken, updateFeedback)
  .delete(authToken, authUserLevel, deleteFeedback);

export default feedbackRoutes;
