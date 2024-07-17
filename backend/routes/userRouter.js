const express = require("express");
const router = express.Router();
const { register, login, getData } = require("../controllers/usersController");
const protect = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.get("/userGoals", protect, getData);

module.exports = router;
