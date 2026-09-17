import { useState } from 'react';
import NameFilter from './components/NameFilter';
import NewContactForm from './components/NewContactForm';
import ContactsList from './components/ContactsList';

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
    setNewNumber('');
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
      <NameFilter nameFilter={nameFilter} onChange={handleChangeNameFilter} />
      <NewContactForm
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <ContactsList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
