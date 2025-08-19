import { useState, useEffect } from "react";
import personsServices from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   setPersons(response.data);
    // });
    personsServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  //ADD PERSON
  const addPerson = (e) => {
    e.preventDefault();
    const checkName = persons.some(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );

    //Confirm if user wants to update person's number
    if (checkName) {
      const confirmed = window.confirm(
        `${newName} is already added to the phonebook, 
          replace the old number with a new one?`
      );

      if (confirmed) {
        const personName = persons.find((item) => item.name === newName);
        const updateNumber = { ...personName, number: newNumber };
        personsServices
          .updatePerson(personName.id, updateNumber)
          .then((response) => {
            setPersons(
              persons.map((item) => (item.id === response.id ? response : item))
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(
              `${response.name}'s number updated successfully!`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 4000);
          })
          .catch((error) => {
            setErrorMessage(`An error has occurred, please try again!`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 4000);
            setPersons(persons.filter((p) => p.id !== personName.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        // id: persons[persons.length - 1].id + 1,
      };

      personsServices.createPerson(newPerson).then((response) => {
        setPersons(persons.concat(response));

        setSuccessMessage(`${newName} was added successfully`);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
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

  //DELETE PERSON
  const delPerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsServices
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== response.data.id));
          setErrorMessage(
            `${response.data.name} was successfully deleted from the server!`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        })
        .catch((error) => {
          setErrorMessage(`${name} has already been deleted from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);

          setPersons(persons.filter((p) => p.id !== id));
        });
    }

    // axios
    //   .delete(`http://localhost:3001/persons/${id}`)
    //   .then((response) => console.log(response.data));
    // console.log(`${name} delete`);
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
      <Notification message={errorMessage} text={"error"} />
      <Notification message={successMessage} text={"success"} />
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
            <Persons
              key={item.id}
              name={item.name}
              number={item.number}
              deletePerson={() => delPerson(item.id, item.name)}
            />
          ))
        : filterName.map((item) => (
            <Persons
              key={item.id}
              name={item.name}
              number={item.number}
              deletePerson={() => delPerson(item.id, item.name)}
            />
          ))}
    </div>
  );
};

export default App;
