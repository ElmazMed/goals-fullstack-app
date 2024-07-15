require("dotenv").config();

const express = require("express");
const app = express();
const errorHandler = require("./middleware/errMiddleware");

const goals = require("./routes/goalsRouter");

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/goals", goals);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
