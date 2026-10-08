import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';

const Results = ({ results, query, setQuery }) => {
  const cleanedQuery = query.toLowerCase().trim();
  if (!cleanedQuery || !results)
    return <p>Enter a filter by name to start searching</p>;

  const filteredCountries = results.filter((country) =>
    country.name.common.toLowerCase().includes(cleanedQuery),
  );

  if (filteredCountries.length === 0)
    return <p>Found no matches for the current filter</p>;

  if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (filteredCountries.length > 1)
    return <CountriesList countries={filteredCountries} setQuery={setQuery} />;

  return <CountryDetails country={filteredCountries[0]} />;
};

export default Results;
