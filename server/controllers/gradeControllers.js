import mongoose from "mongoose";
import gradeModel from "../models/gradeModel.js";

export const getGrade = async (req, res) => {
  try {
    const grade = await gradeModel.find();
    //Checking if the grade is not empty
    if (!grade) {
      return res.status(400).json({ message: "Cannot get grade" });
    }
    //If the grade is not empty sending it to the user
    return res.status(200).json({ message: "Grade has been get", grade });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};

export const setGrade = async (req, res) => {
  const { subjTitle, grade } = req.body;
  try {
    if (!subjTitle || !grade) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newGrade = new gradeModel({ subjTitle, grade });

    if (!newGrade) {
      return res
        .status(400)
        .json({ message: "An error has occurred while making the grade" });
    }

    await newGrade.save();
    return res.status(200).json({ message: "New grade created", newGrade });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};

export const updateGrade = async (req, res) => {
  const gradeId = req.params.id;
  const { subjTitle, grade } = req.body;
  try {
    if (!mongoose.isValidObjectId(gradeId)) {
      return res.status(400).json({ message: "Invalid grade ID format" });
    }

    const isGradeValid = await gradeModel.findById(gradeId);
    if (!isGradeValid) {
      return res.status(400).json({ message: "Grade not found" });
    }

    const updatedGrade = await gradeModel.findByIdAndUpdate(gradeId, {
      subjTitle,
      grade,
    });

    if (!updatedGrade) {
      return res
        .status(400)
        .json({ message: "An error has occurred while updating the grade" });
    }

    return res
      .status(200)
      .json({ message: "Grade has been updated", updatedGrade });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};

export const deleteGrade = async (req, res) => {
  const gradeId = req.params.id;

  try {
    if (!mongoose.isValidObjectId(gradeId)) {
      return res.status(400).json({ message: "Invalid grade ID format" });
    }

    const isGradeValid = await gradeModel.findById(gradeId);
    if (!isGradeValid) {
      return res.status(400).json({ message: "Grade not found" });
    }

    const deletedGrade = await gradeModel.findByIdAndDelete(gradeId);

    if (!deletedGrade) {
      return res
        .status(400)
        .json({ message: "An error has occurred while deleting the grade" });
    }

    return res.status(200).json({ message: "Grade has been deleted" });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
