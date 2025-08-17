import { useState, useEffect } from "react";
import personsServices from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   setPersons(response.data);
    // });
    personsServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

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
        // id: persons[persons.length - 1].id + 1,
      };

      personsServices.createPerson(newPerson).then((response) => {
        setPersons(persons.concat(response));
      });

      // axios
      //   .post("http://localhost:3001/persons", newPerson)
      //   .then((response) => {
      //     setPersons(persons.concat(response.data));
      //   });
      setNewName("");
      setNewNumber("");
    }
  };

  const filterPerson = (e) => {
    // console.log(e.target.value == "");
    if (e.target.value !== "") {
      const filteredPerson = persons.filter(
        (item) =>
          e.target.value.toLowerCase() ===
          item.name.substring(0, e.target.value.length).toLowerCase()
      );
      setFilter(filteredPerson);
    } else {
      setFilter([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={"text"} filterPerson={filterPerson} />

      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={(e) => setNewName(e.target.value)}
        setNewNumber={(e) => setNewNumber(e.target.value)}
        submit={"submit"}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      {filterName.length === 0
        ? persons.map((item) => (
            <Persons key={item.id} name={item.name} number={item.number} />
          ))
        : filterName.map((item) => (
            <Persons key={item.id} name={item.name} number={item.number} />
          ))}
    </div>
  );
};

const Filter = ({ text, filterPerson }) => {
  // console.log({ text, filterPerson });
  return (
    <>
      <p>Filter shown with</p>
      <input type={text} onChange={filterPerson} />
    </>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  submit,
  addPerson,
}) => {
  return (
    <>
      <form>
        <div>
          Name: <input value={newName} onChange={setNewName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={setNewNumber} />
        </div>
        <div>
          <button type={submit} onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

export default App;
