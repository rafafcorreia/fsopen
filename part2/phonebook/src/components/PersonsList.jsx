const PersonsList = ({ filteredPersons }) => {
  return (
    <>
      <h2>Persons</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default PersonsList;
