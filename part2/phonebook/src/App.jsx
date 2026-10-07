import { useEffect, useState } from 'react';
import NameFilter from './components/NameFilter';
import NewPersonForm from './components/NewPersonForm';
import PersonsList from './components/PersonsList';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const notify = (message, success = true) => {
    setNotification({ message, success });
    setTimeout(() => {
      setNotification(null);
    }, 5_000);
  };

  const filteredPersons = nameFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase()),
      )
    : persons;

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedNewName = newName.trim();
    if (!cleanedNewName) return;

    const cleanedNewNumber = newNumber.trim();

    const existingPerson = persons.find(
      (person) => person.name.toUpperCase() === cleanedNewName.toUpperCase(),
    );

    if (!existingPerson) {
      const newPerson = { name: cleanedNewName, number: cleanedNewNumber };
      personsService.create(newPerson).then((person) => {
        setPersons((persons) => persons.concat(person));
        setNewName('');
        setNewNumber('');
        notify(`Added ${cleanedNewName}`);
      });
      return;
    }

    if (existingPerson.number === cleanedNewNumber) {
      alert(`${cleanedNewName} is already added to phonebook`);
      return;
    }

    const canReplace = confirm(
      `${cleanedNewName} is already added to phonebook. Replace the old number with a new one?`,
    );
    if (!canReplace) return;

    const updatedPerson = { ...existingPerson, number: cleanedNewNumber };
    personsService
      .update(updatedPerson)
      .then((person) => {
        setPersons((persons) =>
          persons.map((p) => (p.id === person.id ? person : p)),
        );
        notify(`Updated ${cleanedNewName}'s number to ${cleanedNewNumber}`);
        setNewName('');
        setNewNumber('');
      })
      .catch(() => {
        notify(
          `Information of ${cleanedNewName} has already been removed from server`,
          false,
        );
        personsService.getAll().then((persons) => setPersons(persons));
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

  const handleDelete = (person) => {
    const canDelete = confirm(`Delete ${person.name}?`);
    if (!canDelete) return;

    personsService.exclude(person.id).then((deletedPerson) => {
      setPersons((persons) => persons.filter((p) => p.id !== deletedPerson.id));
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <NameFilter nameFilter={nameFilter} onChange={handleChangeNameFilter} />
      <NewPersonForm
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <PersonsList filteredPersons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};
export default App;
