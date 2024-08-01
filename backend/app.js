require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const errorHandler = require("./middleware/errMiddleware");
const goals = require("./routes/goalsRouter");
const users = require("./routes/userRouter");
const connectDB = require("./db/connectDB");

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/goals", goals);
app.use("/api/v1/users", users);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listenig to ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
