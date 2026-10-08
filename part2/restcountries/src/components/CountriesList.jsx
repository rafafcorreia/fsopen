const CountriesList = ({ countries, setQuery }) => {
  const pStyle = { display: 'inline-block', margin: '5px 10px 5px 0px' };

  const showOnClick = (name) => {
    setQuery(name);
  };

  return (
    <>
      {countries.map((country) => (
        <li key={country.name.common}>
          <p style={pStyle}>{country.name.common}</p>
          <button onClick={() => showOnClick(country.name.common)}>Show</button>
        </li>
      ))}
    </>
  );
};

export default CountriesList;
