const asyncHandler = require("express-async-handler"); //it will handle al async error
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//route POST /api/users/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //first, will check if this user exists or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    //if this user exist throw error
    res.status(400);
    throw new Error("User already exist!");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    //if this user successfully registered
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occurred..");
  }
});

//login
//route POST /api/users/login

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  //now check if this user exist in the db or not
  if (user && (await user.matchPassword(password))) {
    res.json({
      //if the user with this email exists, then send user data in response
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password!..");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //req.user is from authMiddleware

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };