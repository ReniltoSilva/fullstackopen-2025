const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blog");

const app = express();

//Connect to MongoDB
logger.info("Connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => logger.error("Error connecting to MongoDB", err.message));

//Middleware
app.use(express.json());
app.use(middleware.requestLogger);

//Routes
app.use("/api/blogs", blogsRouter);

//Error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
