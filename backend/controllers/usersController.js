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
    res.status(401);
    throw new Error("This user is already registred");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({ email, name, password: hashedPass });

  if (user) {
    res.status(200).json({ token: token(user._id), name: user.name });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      name: user.name,
      token: token(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Sorry we could not find your account!");
  }
});

const getData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// GENERATE TOKEN

const token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { register, login, getData };
