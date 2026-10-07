const PersonsList = ({ filteredPersons, onDelete }) => {
  return (
    <>
      <h2>Persons</h2>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default PersonsList;
