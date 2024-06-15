
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchTerm}`);
      const drugs = response.data?.drugGroup?.conceptGroup.flatMap(group => group.conceptProperties || []);
      
      if (drugs.length === 0) {
        setError('No drugs found for that search term.');
        setSearchResults([]);
      } else {
        setSearchResults(drugs.map(drug => ({ name: drug.name, rxcui: drug.rxcui })));
      }
    } catch (error) {
      setError('An error occurred while fetching drug information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map(drug => (
            <li key={drug.rxcui}>
              <Link to={`/drugs/${encodeURIComponent(drug.name)}`}>{drug.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
