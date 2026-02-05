const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

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
app.use(middleware.extractToken);

/* 
Middleware for all routes(/blogs, /users, /login)
We can use the 'userExtractor' middleware 
for all routes. for example: app.use(middleware.userExtractor); 

Middleare for specific route
we can apply middleware to all api's from one specific route.
Ex: app.use("/api/blogs", middleware.userExtractor, blogsRouter); 

Middleware for individual route handlers(.post, .put, .delete)
Ex: blogsRouter.post("/", userExtractor, async (req, res) => {...}
Ex: blogsRouter.delete("/", userExtractor, async (req, res) => {...}
*/

//Routes
app.use("/api/blogs", blogsRouter);
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
