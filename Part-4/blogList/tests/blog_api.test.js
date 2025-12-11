const assert = require("node:assert");
const { test, after, beforeEach, before, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
  likes: 30,
};

before(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("12345", saltRounds);

  await User.create({
    username: "Junim",
    name: "Renilto",
    passwordHash: passwordHash,
  });
});

describe("Test blogs", async () => {
  let token;
  test("Successful login case", async () => {
    const user = {
      username: "Junim",
      name: "Renilto",
      password: "12345",
    };

    const response = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    token = response.body.token;
    assert.ok(token);
  });

  test("successfully created a new blog post", async () => {
    const before = await api.get("/api/blogs");

    /* Verificar pq dois blogs estão sendo adicionados ao DB
    1 é este aqui, com os likes: 30 e o outro com likes: 0,
    de onde vem esse blog adicionado com likes 0? */
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + `${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const after = await api.get("/api/blogs");
    assert.strictEqual(after.body.length, before.body.length + 1);
  });

  test("Creating new blog fails with 401 if token is not provided", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + "invalid token")
      .expect(401)
      .expect("Content-Type", /application\/json/);
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

  test("Verifies if likes property is missing", async () => {
    const testBlog = {
      title: "The King and the princess",
      author: "John Arthur",
      url: "www.theking.com",
      // likes: 30,
    };

    const response = await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Authorization", "Bearer " + `${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blog = await Blog.findById(response.body.id);
    assert.strictEqual(blog.likes, 0);
  });

  test("fail if the title is missing", async () => {
    const lengthBefore = await api.get("/api/blogs");

    const testBlog = {
      // title: "The King and the princess",
      author: "John Arthur",
      url: "www.theking.com",
      likes: 30,
    };

    //.expect() belongs to supertest and not node:assert
    await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Authorization", "Bearer " + `${token}`)
      .expect(400);

    const lengthAfter = await api.get("/api/blogs");
    assert.strictEqual(lengthAfter.body.length, lengthBefore.body.length);
  });

  test("Fail if url is missing", async () => {
    const lengthBefore = await api.get("/api/blogs");

    const testBlog = {
      title: "The King and the princess",
      author: "John Arthur",
      // url: "www.theking.com",
      likes: 30,
    };

    //.expect() belongs to supertest and not node:assert
    await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Authorization", "Bearer " + `${token}`)
      .expect(400);

    const lengthAfter = await api.get("/api/blogs");
    assert.strictEqual(lengthAfter.body.length, lengthBefore.body.length);
  });

  test("Delete single blog post resource", async () => {
    const before = await api.get("/api/blogs");

    await api
      .delete(`/api/blogs/${before.body[0].id}`)
      .set("Authorization", "Bearer " + `${token}`)
      .expect(204);

    const after = await api.get("/api/blogs");

    assert.strictEqual(after.body.length, before.body.length - 1);
  });

  test("Update info on individual blog post", async () => {
    const testBlog = {
      title: "New info uptaded",
      author: "Junior Arthur",
      url: "www.theking.com",
      likes: 2300,
    };

    const before = await api.get("/api/blogs");

    await api
      .put(`/api/blogs/${before.body[0].id}`)
      .send(testBlog)
      .set("Authorization", "Bearer " + `${token}`)
      .expect(200);

    const after = await api.get("/api/blogs");

    assert.strictEqual(testBlog.likes, after.body[0].likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
