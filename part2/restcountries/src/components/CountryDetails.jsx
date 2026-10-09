import Weather from './Weather';

const CountryDetails = ({ country }) => {
  console.log(country);
  const languages = country.languages
    ? Object.entries(country.languages)
    : null;
  const capital = country.capital ? country.capital[0] : 'N/A';
  const area = country.area ? country.area : 'N/A';

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        Capital: {capital}
        <br />
        Area: {area}
      </p>
      {languages && (
        <>
          <h2>Languages</h2>
          <ul>
            {languages.map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        </>
      )}
      <img src={country.flags.svg} alt={country.flags.alt} />
      <Weather country={country} />
    </>
  );
};

export default CountryDetails;
