import mongoose from "mongoose";

const GradeSchema = mongoose.Schema({
  subjTitle: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const gradeModel = mongoose.model("Grade", GradeSchema);
export default gradeModel;
