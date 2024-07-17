const express = require("express");
const router = express.Router();
const {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsControllers");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, postGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
