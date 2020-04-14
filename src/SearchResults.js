import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h3>Results</h3>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
