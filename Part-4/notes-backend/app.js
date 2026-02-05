//app.js defines the express app
const express = require("express");
const mongoose = require("mongoose");
//Utils
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
//Controllers
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const router = require("./controllers/testing");

const app = express();

//Connect to DB
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => logger.error("Error connecting to MongoDB:", err.message));

//Middleware
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

//Routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

//Error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
