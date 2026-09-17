const NameFilter = ({ nameFilter, onChange }) => {
  return (
    <>
      <label htmlFor="nameFilter">Filters contacts with </label>
      <input onChange={onChange} value={nameFilter} id="nameFilter" />
    </>
  );
};

export default NameFilter;
