const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add avalid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a strong password"],
      minlength: [4, "The password is too short!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
