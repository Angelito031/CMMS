import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import announcementRoutes from "./routes/announcementRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";

//Dotenv config
dotenv.config();

//Setting up the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting up the database and server
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI; //FOR PRODUCTION
const DB_URI = process.env.DB_URI; //FOR DEVELOPMENT
mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `MongoDB is connected and Server is started at port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Server Routes
app.use("/api/announcement", announcementRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/token", tokenRoutes);
