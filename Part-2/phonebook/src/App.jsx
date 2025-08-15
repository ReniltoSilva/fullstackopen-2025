import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    { name: "David Chupovsky", number: "39-44-6422162", id: 5 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState([]);

  const addPerson = (e) => {
    e.preventDefault();
    const checkName = persons.some(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );
    if (checkName) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const filterPerson = (e) => {
    console.log(e.target.value == "");
    if (!e.target.value == "") {
      const filteredPerson = persons.filter(
        (item) =>
          e.target.value.toLowerCase() ===
          item.name.substring(0, e.target.value.length).toLowerCase()
      );
      console.log(filteredPerson);
      setFilter(filteredPerson);
    } else {
      setFilter([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>Filter shown with</p>
        <input type="text" onChange={filterPerson} />
      </div>
      <form>
        <h2>Add a new</h2>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {persons.map((item) => (
        <p>
          {item.name} {item.number}
        </p>
      ))} */}
      {filterName.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};

export default App;
