require("dotenv").config(); //It's important that 'dotenv' gets imported before the 'Note' model so 'Note' can be available globally.
const express = require("express");
// const mongoose = require("mongoose");
const Note = require("./models/note");

// const password = process.argv[2];
// const url = `mongodb+srv://fullstack:${password}@cluster0.si9mrwi.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
// const cors = require("cors");

//Json-parser middleware
app.use(express.json());
// app.use(cors());
app.use(express.static("dist"));

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "10",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// const Note = mongoose.model("Note", noteSchema);

//This is a route to the application
//--This route defines an event handler that handles HTTP get requests.
//--"/api/notes" - this is a path

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  // const id = request.params.id;
  // const note = notes.find((note) => note.id === request.params.id);

  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    //This catch block is incase the promise returned is rejected
    .catch((error) => {
      next(error);
      // console.log(error);
      // response.status(500).send({ error: "malformatted id" });
    });
});

//// Id generator commented out since mongoDB generate automatic IDs for each document in a collection
// const generateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

//Post handler
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   id: generateId(),
  // };

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  // notes = notes.concat(note);
  note.save().then((savedNote) => {
    response.json(savedNote);
    console.log(savedNote);
  });
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

//Delete handler
app.delete("/api/notes/:id", (request, response) => {
  // const id = request.params.id;
  // note = notes.filter((note) => note.id !== id);

  Note.findByIdAndDelete({ _id: request.params.id })
    .then((note) => {
      console.log(note);
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });

  // console.log(response);
  // response.status(204).end();
});

//-----Order loading of middlewares are important

// Middleware to check for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

//Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

//Listen to port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
