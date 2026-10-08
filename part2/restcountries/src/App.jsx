import { useEffect, useState } from 'react';
import axios from 'axios';
import Results from './components/Results';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const cleanedQuery = query.toLowerCase().trim();
  const filteredCountries = selectedCountry
    ? [selectedCountry]
    : results.filter((country) =>
        country.name.common.toLowerCase().includes(cleanedQuery),
      );

  useEffect(() => {
    console.log('effect');
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setResults(response.data);
      });
  }, []);

  const queryOnChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <>
      <label htmlFor="search">Find countries</label>
      <input type="text" id="search" value={query} onChange={queryOnChange} />
      <Results
        filteredCountries={filteredCountries}
        cleanedQuery={cleanedQuery}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  );
};

export default App;
