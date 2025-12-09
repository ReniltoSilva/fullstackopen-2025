const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const usersDB = await User.find({});

  res.status(200).json(usersDB);
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "username and password required" });
    }

    if (username.length < 3 || password.length < 3) {
      return res.status(400).json({
        error: "Username and Password should be minimum 3 characters long",
      });
    }

    //Search for username
    //   const checkUser = await User.findOne({ username });

    //Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      passwordHash,
    });

    //Check if user exists
    //   if (username) {
    //     res.status(400).json({ error: "username must be unique" });
    //   }

    //If not, save new user and return as response
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
