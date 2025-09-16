// require("dotenv").config(); //It's important that 'dotenv' gets imported before the 'Note' model so 'Note' can be available globally.
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
// const express = require("express");
// const Note = require("./models/note");

// const app = express();
//Json-parser middleware
// app.use(express.json());
// app.use(express.static("dist"));

// app.get("/api/notes", (request, response, next) => {
//   Note.find({})
//     .then((notes) => {
//       response.json(notes);
//     })
//     .catch((error) => next(error));
// });

// app.get("/api/notes/:id", (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     //This catch block is incase the promise returned is rejected
//     .catch((error) => {
//       next(error);
//     });
// });

// app.post("/api/notes", (request, response, next) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       response.json(savedNote);
//     })
//     .catch((error) => next(error));
// });

// app.delete("/api/notes/:id", (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// app.put("/api/notes/:id", (request, response, next) => {
//   const { content, important } = request.body;

//   Note.findById(request.params.id)
//     .then((note) => {
//       if (!note) {
//         return response.status(404).end();
//       }

//       note.content = content;
//       note.important = important;

//       return note.save().then((updatedNote) => {
//         response.json(updatedNote);
//       });
//     })
//     .catch((error) => next(error));
// });

// // Middleware to check for unknown endpoints
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };
// app.use(unknownEndpoint);

// //Error handler middleware
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message });
//   }

//   next(error);
// };
// app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
  // console.log(`Server running on port ${PORT}`);
});
