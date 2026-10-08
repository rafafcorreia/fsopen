import { useEffect, useState } from 'react';
import axios from 'axios';
import Results from './components/Results';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

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
  };

  return (
    <>
      <label htmlFor="search">Find countries</label>
      <input type="text" id="search" value={query} onChange={queryOnChange} />
      <Results results={results} query={query} setQuery={setQuery} />
    </>
  );
};

export default App;
