require("dotenv").config();

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
