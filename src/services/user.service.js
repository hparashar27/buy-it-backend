const User = require('../models/User.model');
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");


const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with this email: " + email);
    }
    password = await bcrypt.hash(password, 8);
    const user = await User.create({ firstName, lastName, email, password });
    console.log("User is created:", user);
    return user;
  } catch (error) {
    throw new Error("Something went wrong: " + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with email: " + email);
    }
    return user;
  } catch (error) {
    throw new Error("Something went wrong: " + error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found with ID: " + userId);
    }
    return user;
  } catch (error) {
    throw new Error("Something went wrong: " + error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdByToken(token);
    const user = (await findUserById(userId)).populate("address");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error("Cannot find users");
    }
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUserProfileByToken,
  findUserById,
  getUserByEmail,
  getAllUsers,
};
