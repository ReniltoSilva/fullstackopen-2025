const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((result) => {
    res.json(result);
  });
});

blogsRouter.get("/:id", (req, res, next) => {
  Blog.findById({ _id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

blogsRouter.post("/", (req, res) => {
  const body = req.body;

  if (!body) return res.status(404).json({ error: "content is missing" });

  const newitem = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  newitem
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

blogsRouter.put("/:id", (req, res) => {
  const body = req.body;
  Blog.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
  )
    .then((result) => {
      console.log(result, "Item updated in blog list");
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

blogsRouter.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      console.log(result, "Item deleted");
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
