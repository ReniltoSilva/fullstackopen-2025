const express = require("express");
const app = express();

let persons = [
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

//Function to find person by id
const findId = (req) => {
  const id = req;
  const person = persons.find((person) => person.id === id);

  return person;
};

app.get("/info", (req, res) => {
  const entries = persons.length;
  const time = new Date();

  res.send(
    `<p>Phonebook has info for ${entries} people</p>
    <p>${time}<p/>`
  );
});

//Get list of items
app.get("/api/persons/", (req, res) => {
  res.json(persons);
});

//Get item by id
app.get("/api/persons/:id", (req, res) => {
  const person = findId(req.params.id);

  //Check if item is available or not
  if (person) {
    res.json(person);
  } else res.status(404).end();
});

//Delete item from persons list
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  console.log(res);
  res.status(204).end();
});

//Listen for requests on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
