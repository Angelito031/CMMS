import announcementModel from "../models/announcementModel.js";

//Getting the announcements
export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await announcementModel.find();
    //Checking if the announcement is not empty
    if (!announcement) {
      return res.status(400).json({ message: "Cannot get announcement" });
    }
    //If the announcement is not empty sending it to the user
    return res
      .status(200)
      .json({ message: "Announcement has been get", announcement });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
//Creating the announcements
export const setAnnouncement = async (req, res) => {
  const { text } = req.body;
  try {
    //Check if text is empty
    if (!text) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const announcement = new announcementModel(text);
    //Check if announcement is empty
    if (!announcement) {
      return res.status(400).json({
        message: "An error has occurred while saving the announcement",
      });
    }
    //Saving the announcement if it is not empty
    await announcement.save();
    return res
      .status(200)
      .json({ message: "Announcement has been created", announcement });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
//Updating the announcements
export const updateAnnouncement = async (req, res) => {
  const { text } = req.body;
  const announcementId = req.params.id;
  try {
    //Check if text is empty
    if (!text) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    //Finding the announcement by id and updating it
    const announcement = await announcementModel.findByIdAndUpdate(
      announcementId,
      text
    );

    return res
      .status(200)
      .json({ message: "Announcement has been updated", announcement });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
