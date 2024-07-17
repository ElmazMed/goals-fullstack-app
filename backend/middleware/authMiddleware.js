const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select("password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Invalid token");
  }
});

module.exports = protect;
