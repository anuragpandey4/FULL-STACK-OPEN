import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addName = (e) => {
    e.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newPersonObject.name)) {
      const existingPerson = persons.find(
        (person) => (person.name = newPersonObject.name)
      );

      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phonebookService
          .update(existingPerson.id, newPersonObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setSuccessMsg(`Updated ${existingPerson.name}`);
            setTimeout(() => {
              setSuccessMsg(``);
            }, 5000);
          });
      }
    } else {
      phonebookService
        .create(newPersonObject)
        .then((returnedPersonObj) =>
          setPersons(persons.concat(returnedPersonObj))
        );
      setSuccessMsg(`Added ${newPersonObject.name}`);
      setTimeout(() => {
        setSuccessMsg(``);
      }, 5000);
    }
    setNewName("");
  };

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const newFilteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredPersons(newFilteredPersons);
  };

  const deletePersonOf = (name, id) => {
    console.log(`deleting person of ${id} now...`);
    phonebookService
      .deleteEntry(id)
      .then((deletedPerson) => {
        const newPersons = persons.filter(
          (person) => person.id !== deletedPerson.id
        );
        setPersons(newPersons);
      })
      .catch((error) => {
        setErrorMsg(
          `Information of ${name} has already been removed from server`
        );
        setTimeout(() => {
          setErrorMsg("error: ", error);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {successMsg !== "" ? (
        <SuccessNotification successMsg={successMsg} />
      ) : null}
      {errorMsg !== "" ? <ErrorNotification errorMsg={errorMsg} /> : null}
      <Filter
        onFilterChange={handleFilterChange}
        filteredPersons={filteredPersons}
      />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons deletePersonOf={deletePersonOf} persons={persons} />
    </div>
  );
};

export default App;
