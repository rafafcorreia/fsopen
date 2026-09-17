const ContactsList = ({ filteredPersons }) => {
  return (
    <>
      <h2>Contacts</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default ContactsList;
