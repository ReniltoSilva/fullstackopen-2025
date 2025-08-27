const express = require("express");
const app = express();

app.use(express.json());

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

// //Function to generate id
// const generateID = () => {
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

//Function to generate id
const generateID = () => {
  return persons.length > 0
    ? Math.max(...persons.map((n) => Number(n.id) * Math.random()))
    : 0;
};

//Post new item to persons list
app.post("/api/persons/", (request, res) => {
  const body = request.body;
  const checkName = persons.find((item) => item.name === body.name);

  if (!body.name) {
    return res.status(400).json({
      error: "Name missing",
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "Number missing",
    });
  } else if (checkName) {
    return res.status(400).json({
      error: "Name already exists, it must be unique!",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons = persons.concat(person);
  res.json(person);
  console.log(response);
});

//Listen for requests on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
