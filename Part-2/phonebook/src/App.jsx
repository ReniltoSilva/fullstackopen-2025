import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const checkName = persons.some(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );
    if (checkName) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
    } else {
      const newPerson = {
        name: newName,
      };

      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};

export default App;
