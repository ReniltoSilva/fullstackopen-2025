const assert = require("node:assert");
const { beforeEach, after, test, describe } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe("Check username and password tests", () => {
  test("Succeeds with valid username and password", async () => {
    const newUser = {
      username: "junim",
      name: "Renilto",
      password: "1234",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.username, "junim");
    assert.strictEqual(response.body.name, "Renilto");
    assert.strictEqual(response.body.password, undefined);
  });

  test("Fails if username is less then 3 characters", async () => {
    const newUser = {
      username: "ju",
      name: "Renilto",
      password: "haha",
    };

    await api.post("/api/users").send(newUser).expect(400);

    // const checkDB = await User.find({});
    // assert.strictEqual(checkDB.length, 0);
  });

  test("Fails if password is less then 3 characters", async () => {
    const newUser = {
      username: "jur",
      name: "Renilto",
      password: "ha",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("fails if username is missing", async () => {
    const newUser = {
      name: "Renilto",
      password: "ha",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert(response.body.error.includes("username"));
  });

  test("fails if password is missing", async () => {
    const newUser = {
      username: "Junior",
      name: "Renilto",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    assert(response.body.error.includes("password"));
  });

  test("fails if username is not unique", async () => {
    const newUser = {
      username: "Maria",
      name: "Renilto",
      password: "haha",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert(response.body.error.includes("expected `username` to be unique"));
  });
});
after(async () => {
  await mongoose.connection.close();
});
