const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
  // .then((result) => {
  //   res.json(result);
  // });
});

blogsRouter.get("/:id", async (req, res, next) => {
  const blog = await Blog.findById({ _id: req.params.id });

  res.status(200).json(blog);
  // .then((result) => {
  //   if (result) {
  //     res.json(result);
  //   } else {
  //     res.status(404).end();
  //   }
  // })
  // .catch((err) => next(err));
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ error: "content is missing" });
  } else if (!body.title || !body.url) {
    return res.status(400).json({ error: "Title or url missing" });
  }

  const newitem = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  // newitem
  //   .save()
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((err) => next(err));

  const blog = await newitem.save();
  res.status(201).json(blog);
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const blog = await Blog.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
  );
  console.log(blog, "Item updated in blog list");
  res.status(200).json(blog);

  // .then((result) => {
  //   console.log(result, "Item updated in blog list");
  //   res.status(200).json(result);
  // })
  // .catch((err) => next(err));
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete({ _id: req.params.id });

  res.status(204).json(blog);

  // .then((result) => {
  //   console.log(result, "Item deleted");
  //   res.status(200).json(result);
  // })
  // .catch((err) => next(err));
});

module.exports = blogsRouter;
