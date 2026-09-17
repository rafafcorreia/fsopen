const NewContactForm = ({
  onSubmit,
  onChangeName,
  onChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <>
      <h2>Add a new contact</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name: </label>
        <input onChange={onChangeName} value={newName} id="name" />
        <br />
        <label htmlFor="number">Number: </label>
        <input onChange={onChangeNumber} value={newNumber} id="number" />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewContactForm;
