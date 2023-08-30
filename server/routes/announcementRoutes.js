import express from "express";
import {
  getAnnouncement,
  setAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementControllers.js";

const announcementRoutes = express.Router();
//Announcement Routes
announcementRoutes.route("/").get(getAnnouncement).post(setAnnouncement).put();
announcementRoutes.route("/:id").put(updateAnnouncement);

export default announcementRoutes;
