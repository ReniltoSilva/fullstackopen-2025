const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const helper = require("../tests/test_helper");

const api = supertest(app);

// // describe.only("when there is initially one user in db", () => {
// beforeEach(async () => {
//   await User.deleteMany({});

//   const passwordHash = await bcrypt.getRounds("Sekret", 10);

//   const user = new User({
//     username: "root",
//     passwordHash,
//   });

//   await user.save();
// });

// test("creation succeeds with a fresh username", async () => {
//   const userAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "mluukkai",
//     name: "Matti Luukkainen",
//     password: "salainen",
//   };

//   //Difference of send() and save() in this case?
//   await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   const userAtEnd = await helper.usersInDb();
////why userAtEnd.length without the .body?
//   assert.strictEqual(userAtEnd.length, userAtStart.length + 1);

//   //Check why not map over userAtEnd.body?
//   const username = userAtEnd.map((u) => u.username);
//   assert(username.includes(newUser.username));
// });

// test("creation fails with proper statuscode and message if username already taken", async () => {
//   const usersAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "root",
//     name: "Superuser",
//     password: "salainen",
//   };

//   const result = await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   const usersAtEnd = await helper.usersInDb();
//   assert(result.body.error.includes("expected `username` to be unique"));

//   assert.strictEqual(usersAtEnd.length, usersAtStart.length);
// });
// // });

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper status code and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
