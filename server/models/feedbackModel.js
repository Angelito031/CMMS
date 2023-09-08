import mongoose from "mongoose";

const FeedbackSchema = mongoose.Schema({
  studNo: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const feedbackModel = mongoose.model("Feedback", FeedbackSchema);
export default feedbackModel;
