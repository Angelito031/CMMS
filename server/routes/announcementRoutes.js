import express from "express";
import {
  getAnnouncement,
  setAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementControllers.js";
import { authToken } from "../middlewares/authToken.js";
import { authUserLevel } from "../middlewares/authUserLevel.js";

const announcementRoutes = express.Router();
//Announcement Routes
announcementRoutes
  .route("/")
  .get(authToken, getAnnouncement)
  .post(authToken, authUserLevel, setAnnouncement);
announcementRoutes
  .route("/:id")
  .put(authToken, authUserLevel, updateAnnouncement);

export default announcementRoutes;
