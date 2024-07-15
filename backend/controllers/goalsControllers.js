const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalsModel");

const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find();
  res.status(200).json({ goal });
});

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }
  const goal = await Goal.create(req.body);
  res.status(200).json({ goal });
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedGoal });
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ goal });
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
