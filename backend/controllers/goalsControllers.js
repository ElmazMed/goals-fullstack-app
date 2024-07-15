const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "Get goals" });
});

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }
  res.status(200).json({ msg: "Create goal" });
});

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Update goal with the id of ${req.params.id}` });
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Delete goal with the id of ${req.params.id}` });
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
