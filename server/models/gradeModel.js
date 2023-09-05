import mongoose from "mongoose";

const GradeSchema = mongoose.Schema({
  studNo: {
    type: String,
    required: true,
  },
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
