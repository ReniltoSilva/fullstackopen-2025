const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

app.use(
  morgan(
    ":method Status[:status] url[:url] Response-time[:response-time] Date[:date]"
  )
);

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => console.log(error, "Error connecting to MongoDB"));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

// let blogs = [
//   {
//     id: 1,
//     url: "sfdgsdfgsdfgsdfgsdfgsfdg",
//     name: "Junior",
//   },
//   {
//     id: 2,
//     url: "sfdgsdfgsdfgsdfgsdfgsfdg",
//     name: "Gretta",
//   },
//   {
//     id: 3,
//     url: "sfdgsdfgsdfgsdfgsdfgsfdg",
//     name: "Maria",
//   },
// ];

//Get all items
app.get("/api/blogs", (req, res, next) => {
  //   res.status(200).json(blogs);

  Blog.find({})
    .then((item) => {
      res.json(item);
    })
    .catch((err) => next(err));
});

//Get item by id
app.get("/api/blogs/:id", (req, res, next) => {
  //   const item = blogs.find((item) => item.id === Number(req.params.id));
  //   if (!item) return res.json({ error: `item (${req.params.id}) not found` });
  //   res.status(200).json(item);

  Blog.findById({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

//Add item to list
app.post("/api/blogs", (req, res, next) => {
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

app.put("/api/blogs/:id", (req, res, next) => {
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

app.delete("/api/blogs/:id", (req, res, next) => {
  //   if (!req.params.id) return res.status(404).json({ error: "item not found" });
  //   const updatedList = blogs.filter((item) => item.id !== Number(req.params.id));
  //   res.json(updatedList);

  Blog.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      console.log(result, "Item deleted");
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

//Middleware for no endpoint
const unknownEndpoint = (req, res, next) => {
  res.json({
    error: "Unknown endpoint",
  });
};
app.use(unknownEndpoint);

//Middleware for error logging
const errorhandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.message === "CastError") {
    return res.status(400).send({ err: "malformatted id" });
  } else if (err.message === "ValidationError") {
    return res.status(400).json({ err: err.message });
  }

  next(err);
};
app.use(errorhandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server runnin on port ${PORT}`));
