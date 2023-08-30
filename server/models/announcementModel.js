import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    text: String,
  },
  { timestamps: true }
);

const announcementModel = mongoose.model("Announcement", announcementSchema);
export default announcementModel;
