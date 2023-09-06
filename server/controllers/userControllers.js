import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return res
        .status(400)
        .json({ message: "An error has occurred while getting all the users" });
    }
    return res.status(200).json({ message: "Got all users", users });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }
    return res.status(200).json({ message: "Got the user", user });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
export const setUser = async (req, res) => {
  const { studNo, password, fullname, address, contact, userLevel } = req.body;
  try {
    if (
      !studNo ||
      !password ||
      !fullname ||
      !address ||
      !contact ||
      !userLevel
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const isStudNoUIsUnique = await userModel.findOne({ studNo });
    if (isStudNoUIsUnique) {
      return res.status(400).json({ message: "Student no. is taken" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      return res
        .status(400)
        .json({ message: "An error has occurred while hashing your password" });
    }
    const newUser = new userModel({
      studNo,
      password: hashPassword,
      fullname,
      address,
      contact,
      userLevel,
    });
    if (!newUser) {
      return res
        .status(400)
        .json({ message: "An error has occurred while making your account" });
    }
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, studNo, fullname, address, contact, userLevel },
      process.env.SECRET
    );
    return res.status(200).json({
      message: "User created",
      user: { id: newUser._id, studNo, fullname, address, contact, userLevel },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
export const updateUser = async (req, res) => {
  const { studNo, password, fullname, address, contact } = req.body;
  const userId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const isUserExist = await userModel.findById(userId);
    if (!isUserExist) {
      return res.status(400).json({ message: "User not exist" });
    }
    if (!studNo || !password || !fullname || !address || !contact) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { studNo, password, fullname, address, contact },
      { new: true }
    );
    return res.status(200).json({ message: "User Updated", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const isUserExist = await userModel.findById(userId);
    if (!isUserExist) {
      return res.status(400).json({ message: "User not exist" });
    }
    await userModel.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "An Error Has Occurred" });
  }
};
