import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    studNo: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    userLevel: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", UserSchema);
export default userModel;
