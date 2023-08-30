import subjectModel from "../models/subjectModel.js";
import mongoose from "mongoose";

export const getSubject = async (req, res) => {
  try {
    const subject = await subjectModel.find();
    if (!subject) {
      return res
        .status(400)
        .json({ message: "An error has occurred while getting the subjects" });
    }

    return res.status(200).json({ message: "Subject has been get", subject });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};

export const setSubject = async (req, res) => {
  const { subjCode, subjTitle, units, day, time, faculty, professor } =
    req.body;
  try {
    if (
      !subjCode ||
      !subjTitle ||
      !units ||
      !day ||
      !time ||
      !faculty ||
      !professor
    ) {
      return res.status(200).json({ message: "Please fill all the fields" });
    }
    const subject = new subjectModel({
      subjCode,
      subjTitle,
      units,
      day,
      time,
      faculty,
      professor,
    });

    if (!subject) {
      return res
        .status(400)
        .json({ message: "An error has occurred while making the subject" });
    }
    await subject.save();
    return res.status(200).json({ message: "Subject created", subject });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};

export const updateSubject = async (req, res) => {
  const subjectId = req.params.id;
  const { subjCode, subjTitle, units, day, time, faculty, professor } =
    req.body;
  try {
    if (!mongoose.isValidObjectId(subjectId)) {
      return res.status(400).json({ message: "Invalid subject ID format" });
    }

    const isSubjectValid = await subjectModel.findById(subjectId);
    if (!isSubjectValid) {
      return res.status(400).json({ message: "Subject not found" });
    }

    const subject = await subjectModel.findByIdAndUpdate(
      subjectId,
      {
        subjCode,
        subjTitle,
        units,
        day,
        time,
        faculty,
        professor,
      },
      { new: true }
    );

    if (!subject) {
      return res
        .status(400)
        .json({ message: "An error has occurred while updating the subject" });
    }

    return res
      .status(200)
      .json({ message: "Subject has been updated", subject });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};

export const deleteSubject = async (req, res) => {
  const subjectId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(subjectId)) {
      return res.status(400).json({ message: "Invalid subject ID format" });
    }

    const isSubjectValid = await subjectModel.findById(subjectId);
    if (!isSubjectValid) {
      return res.status(400).json({ message: "Subject not found" });
    }

    await subjectModel.findByIdAndDelete(subjectId);
    return res.status(200).json({ message: "Subject Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
