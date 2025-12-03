const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   await Blog.insertMany(helper.initialBlogs);
// });

test("blogs are returned as json and correct amount", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("verifies unique id property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  const checkId = response.body[0];
  assert.ok(checkId.id);
  assert.strictEqual(checkId._id, undefined);
});

test.only("successfully created a new blog post", async () => {
  const newBlog = {
    content: "test content",
    important: true,
  };

  const before = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const after = await api.get("/api/blogs");

  assert.strictEqual(after.body.length, before.body.length + 1);
});

after(async () => {
  await mongoose.connection.close();
});
