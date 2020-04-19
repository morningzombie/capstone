import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ auth }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('/api/profiles')
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  const userZip = profile.zipcode;

  const findUsersWithZipCode = async (userzip) => {
    await axios
      .get('/api/users/zipCode', userzip)
      .then((response) => setResults([response.data, ...results]));
  };

  console.log('results', results);

  return (
    <div>
      <h3>Results</h3>
      <div>
        <form>
          <div>{userZip}</div>
        </form>
      </div>
      {/* <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default SearchResults;
