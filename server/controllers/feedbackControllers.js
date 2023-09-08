import mongoose from "mongoose";
import feedbackModel from "../models/feedbackModel.js";

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find();
    if (!feedbacks) {
      return res
        .status(400)
        .json({ message: "An error has occurred while getting the feedbacks" });
    }
    return res.status(200).json({ message: "Get Feedback", feedbacks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An Error Has Occurred", error: error.message });
  }
};
export const setFeedback = async (req, res) => {
  const { studNo, fullname, feedback } = req.body;
  try {
    if (!studNo || !fullname || !feedback) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newFeedback = new feedbackModel({ studNo, fullname, feedback });
    if (!newFeedback) {
      return res
        .status(400)
        .json({ message: "An error has occurred while making your feedback" });
    }
    await newFeedback.save();
    return res.status(200).json({ message: "Feedback Created", newFeedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An Error Has Occurred", error: error.message });
  }
};
export const updateFeedback = async (req, res) => {
  const { studNo, fullname, feedback } = req.body;
  const feedbackId = req.params.id;

  try {
    const isFeedbackExist = await feedbackModel.findById(feedbackId);
    if (!isFeedbackExist) {
      return res.status(400).json({ message: "Feedback doesn`t exist" });
    }
    if (!studNo || !fullname || !feedback) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const updatedFeedback = await feedbackModel.findByIdAndUpdate(
      feedbackId,
      { studNo, fullname, feedback },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(400).json({
        message: "An error has occurred while updating your feedback",
      });
    }
    return res
      .status(200)
      .json({ message: "Feedback Updated", updatedFeedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An Error Has Occurred", error: error.message });
  }
};
export const deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const isFeedbackExist = await feedbackModel.findById(feedbackId);
    if (!isFeedbackExist) {
      return res.status(400).json({ message: "Feedback doesn`t exist" });
    }
    const deletedFeedback = await feedbackModel.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      return res.status(400).json({
        message: "An error has occurred while deleting your feedback",
      });
    }
    return res.status(200).json({ message: "Delete Feedback" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An Error Has Occurred", error: error.message });
  }
};
