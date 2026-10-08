const CountriesList = ({ countries, setSelectedCountry }) => {
  const pStyle = { display: 'inline-block', margin: '5px 10px 5px 0px' };

  const showOnClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      {countries.map((country) => (
        <li key={country.name.common}>
          <p style={pStyle}>{country.name.common}</p>
          <button onClick={() => showOnClick(country)}>Show</button>
        </li>
      ))}
    </>
  );
};

export default CountriesList;
