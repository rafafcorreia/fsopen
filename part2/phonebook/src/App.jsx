import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'John Smith', number: '030-2345678' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const filteredPersons = nameFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase()),
      )
    : persons;

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedNewName = newName.trim();
    if (!cleanedNewName) return;

    const isSamePerson = persons.some((person) => {
      return person.name.toUpperCase() == cleanedNewName.toUpperCase();
    });

    if (isSamePerson) {
      alert(`${cleanedNewName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: cleanedNewName, number: newNumber.trim() };
    const updatedPersons = persons.concat(newPerson);
    setPersons(updatedPersons);
    setNewName('');
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <label htmlFor="nameFilter">Filters contacts with </label>
      <input
        onChange={handleChangeNameFilter}
        value={nameFilter}
        id="nameFilter"
      />
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChangeName} value={newName} id="name" />
        <br />
        <label htmlFor="number">Number: </label>
        <input onChange={handleChangeNumber} value={newNumber} id="number" />
        <button type="submit">add</button>
      </form>
      <h2>Contacts</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
