const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.si9mrwi.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Mongose makes things easy",
  important: true,
});

////Command to save an object
// note.save().then((result) => {
//   console.log(note);
//   mongoose.connection.close();
// });

// //Command to find all objects in a collection
// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// //Command to update properties using 'updateOne' method
// Note.updateOne(
//   { _id: "68bfaaf3cec8f881e4b3d702" },
//   { $set: { content: "New object updated" } }
// ).then((result) => {
//   console.log(result);
//   mongoose.connection.close();
// });
