const Blog = require("../models/blog");

const initialBlogs = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

module.exports = { initialBlogs };
