// const mongoose = require("mongoose");

//---------I DON'T KNOW IF THIS BLOCK OF CODE IS SUPPOSED TO BE HERE IN MONGO.JS
//PART-4 -> Initializing the database before tests

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
// const content = process.argv[3];
// const important = process.argv[4];

// const url = `mongodb+srv://fullstack:${password}@cluster0.si9mrwi.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// // const note = new Note({
// //   content: content,
// //   important: important ?? true,
// // });

// // if (process.argv.length === 3) {
// //   //Command to find all objects in a collection
// //   Note.find({}).then((result) => {
// //     result.forEach((note) => {
// //       console.log(note);
// //     });
// //     mongoose.connection.close();
// //   });
// // }
// // //Command to save an object
// // else
// //   note.save().then((result) => {
// //     console.log(note);
// //     mongoose.connection.close();
// //   });

// // //Command to find all objects in a collection
// // Note.find({}).then((result) => {
// //   result.forEach((note) => {
// //     console.log(note);
// //   });
// //   mongoose.connection.close();
// // });

// // //Command to update properties using 'updateOne' method
// // Note.updateOne(
// //   { _id: "68bfaaf3cec8f881e4b3d702" },
// //   { $set: { content: "New object updated" } }
// // ).then((result) => {
// //   console.log(result);
// //   mongoose.connection.close();
// // });

const assert = require("node:assert");

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"));
});
