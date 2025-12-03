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

const blogsInDB = async () => {
  const blogs = await Blog.find({});

  return blogs.map((b) => b.toJSON());
};

module.exports = { initialBlogs, blogsInDB };
