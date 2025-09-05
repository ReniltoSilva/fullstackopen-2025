const express = require("express");
// const cors = require("cors");
const app = express();

//MIddlewares
app.use(express.json());
// app.use(cors());
app.use(express.static("dist"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "10",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

//This is a route to the application
//--This route defines an event handler that handles HTTP get requests.
//--"/api/notes" - this is a path

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

//Get handler
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  response.json(note);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

//Post handler
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

//Delete handler
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  console.log(response);
  response.status(204).end();
});

//Listen to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
