const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

//Question
//Can I make a request to the app server with app.get(...) etc? if so,
//Why do I need to have app wrapped in the supertest? what's the advantage
//and benefits of having app wrapped in supertest? what happens if I don't
//wrappe the app in supertest?

//Inside blogs router, why do I need to have the .Router() after ('express')?
//What does it do? what happens if I don't have it there?

const newBlog = {
  title: "The King and the princess",
  author: "John Arthur",
  url: "www.theking.com",
  // likes: 30,
};

beforeEach(async () => {
  await Blog.deleteMany({});
  // await Blog.insertMany(helper.initialBlogs);
});

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

test("successfully created a new blog post", async () => {
  const before = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const after = await api.get("/api/blogs");

  assert.strictEqual(after.body.length, before.body.length + 1);
});

test.only("Verifies if likes property is missing", async () => {
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  response = await api.get("/api/blogs");

  // console.log("Response returned from server", response.body);
  assert.strictEqual(response.body[0].likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
