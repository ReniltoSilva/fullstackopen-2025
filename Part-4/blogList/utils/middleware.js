const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* Extracts token from authorization property in header,
then check if token exists and if it starts with 'Bearer',
if both are tru, removes 'Bearer ' and add token 
to 'token' property in the header before it reaches the routes */
const extractToken = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    request.token = token;
  }
  next();
};

/* Checks if token is valid, check if user exists in DB 
then add user info to header before reaching the routes */
const userExtractor = async (request, response, next) => {
  const userInfo = jwt.verify(request.token, process.env.SECRET);
  /*Should it be some validation check here for userInfo? 
  to check if verification went ok? and then proceed with the rest of the code?*/
  const user = await User.findById(userInfo.id);

  request.user = { username: user.username, name: user.name, id: userInfo.id };
  next();
};

const requestLogger = (request, response, next) => {
  logger.info("|----Middleware requestLogger----|");
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("|----Middleware requestLogger----|");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  extractToken,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
