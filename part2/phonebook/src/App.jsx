import { useEffect, useState } from 'react';
import NameFilter from './components/NameFilter';
import NewPersonForm from './components/NewPersonForm';
import PersonsList from './components/PersonsList';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    personsService.getAll().then((contacts) => setPersons(contacts));
  }, []);

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
    personsService.create(newPerson).then((person) => {
      setPersons(persons.concat(person));
      setNewName('');
      setNewNumber('');
    });
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
      <NewPersonForm
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <PersonsList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
