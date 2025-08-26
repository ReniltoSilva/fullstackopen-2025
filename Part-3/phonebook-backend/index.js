const express = require("express");
const app = express();

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// const info = "Phonebook has info for 2 people";

app.get("/info", (request, response) => {
  const entries = persons.length;
  const time = new Date();

  response.send(
    `<p>Phonebook has info for ${entries} people</p>
    <p>${time}<p/>`
  );
});

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((item) => item.id === id);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
