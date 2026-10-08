import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';

const Results = ({ filteredCountries, cleanedQuery, setSelectedCountry }) => {
  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  }

  if (!cleanedQuery) return <p>Enter a filter by name to start searching</p>;

  if (filteredCountries.length === 0)
    return <p>Found no matches for the current filter</p>;

  if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (filteredCountries.length > 1)
    return (
      <CountriesList
        countries={filteredCountries}
        setSelectedCountry={setSelectedCountry}
      />
    );
};

export default Results;
