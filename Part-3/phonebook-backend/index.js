require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
//We don't need cors anymore since the static files are being served by the backend
const app = express();

morgan.token("info", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :info")
);

app.get("/info", (req, res) => {
  const entries = persons.length;
  const time = new Date();

  res.send(
    `<p>Phonebook has info for ${entries} people</p>
    <p>${time}<p/>`
  );
});

// app.get("/", (req, res) => {
//   res.send("Hello, backend is working");
// });

//Get list of items - API endpoint for list of persons
app.get("/api/persons/", (req, res) => {
  Person.find({}).then((persons) => {
    console.log(persons);
    res.json(persons);
  });
});

//Get item by id
app.get("/api/persons/:id", (req, res) => {
  // const person = findId(req.params.id);
  //   //Check if item is available or not
  //   if (person) {
  //     res.json(person);
  //   } else res.status(404).end();

  Person.findOne({ _id: req.params.id }).then((result) => {
    result ? res.json(result) : res.status(404).end();
    console.log(result);
  });
});

//Delete item from persons list
app.delete("/api/persons/:id", (req, res) => {
  // const id = req.params.id;
  // persons = persons.filter((person) => person.id !== id);

  // console.log(res);
  // res.status(204).end();

  Person.findByIdAndDelete({ _id: req.params.id }).then((person) => {
    console.log(person);
    res.status(202).end();
  });
});

//Post new item to persons list
app.post("/api/persons/", (request, res) => {
  const body = request.body;
  // const checkName = persons.find((item) => item.name === body.name);
  // const checkName = Person.exists({ name: body.name });

  // if (!body.name) {
  //   return res.status(400).json({
  //     error: "Name missing",
  //   });
  // } else if (!body.number) {
  //   return res.status(400).json({
  //     error: "Number missing",
  //   });
  // } else if (checkName) {
  //   console.log(checkName);
  //   return res.status(400).json({
  //     error: "Name already exists, it must be unique!",
  //   });
  // }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: generateID(),
  // };

  // persons = persons.concat(person);
  // res.status(201).json(person);

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((result) => {
    console.log(result);
    res.status(201).end();
  });
});

//Middleware to check for unknown endpoints
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);

//Listen for requests on port 3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
