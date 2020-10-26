require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const { meetRouter } = require("./components/meets/meetRouter");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(helmet());
app.use("/meet", meetRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  try {
    console.log("Server up: localhost:3000");
  } catch (error) {
    console.log(error);
  }
});
