const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("Data coming from frontend - req.body backend", req.body);

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });

  // const user = await User.findOne({ username });

  // const passwordCorrect =
  //   user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // if (!(user && passwordCorrect)) {
  //   return res.status(400).json({ error: "invalid username or password" });
  // }

  // const userForToken = {
  //   username: user.username,
  //   id: user._id,
  // };

  // const token = jwt.sign(userForToken, process.env.SECRET);

  // res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
