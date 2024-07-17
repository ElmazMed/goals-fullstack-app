const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400);
    throw new Error("Please fill all the filed");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("This user is already registred");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({ email, name, password: hashedPass });

  if (user) {
    res.status(200).json({ id: user.id, name, email, token: token(user._id) });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comaprePass = await bcrypt.compare(password, user.password);

  if (user && comaprePass) {
    res
      .status(200)
      .json({ id: user.id, name: user.name, email, token: token(user._id) });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getData = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({ _id, email, name });
});

// GENERATE TOKEN

const token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { register, login, getData };
