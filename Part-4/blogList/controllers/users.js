const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  res.json(users);
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

usersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id });

  res.status(204).json("User deleted from DB");
});

module.exports = usersRouter;
