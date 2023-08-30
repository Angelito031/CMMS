import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  subjCode: {
    type: String,
    unique: true,
    required: true,
  },
  subjTitle: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
});

const subjectModel = mongoose.model("Subject", subjectSchema);
export default subjectModel;
