/**
 * dependencies
 */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRoute");
const transactionRouter = require("./routers/transactionRoute");
const passport = require("passport");

/**
 * express app
 */
const app = express();

/**
 * moddleware
 */
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./passport")(passport);

app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our home page",
  });
});

/**
 * setup server
 */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose.connect(
    "mongodb://localhost:27017/money-management-app",
    { useNewUrlParser: true },
    () => {
      console.log("database connected");
    }
  );
});
