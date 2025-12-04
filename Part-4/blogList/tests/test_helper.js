const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "The whale",
    author: "John Arthur",
    url: "www.thewhale.com",
    likes: 30,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});

  return blogs.map((b) => b.toJSON());
};

module.exports = { initialBlogs, blogsInDB };
