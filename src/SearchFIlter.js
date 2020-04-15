mport React, { useState, useEffect } from 'react';

const SearchFilter = ({ results, criteria }) => {
  const [filter, setFilter] = useState('');
  return (
    <div>
      <form>
        <div className="form-group mt-3">
          <label htmlFor="about">Someone that matches my preference in:</label>
          <select
            type="text"
            id="searchFilter"
            name="searchFilter"
            onChange={(ev) => setFilter(ev.target.value)}
          >
            <option value="zipCode">Zip Code</option>
            <option value="career">Occupation</option>
            <option value="employmentStatus">Employment Status</option>
            <option value="pets">Pets </option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
            <option value="politicalAffiliation">Political affiliation</option>
            <option value="religiousAffiliation">Religion affiliation</option>
            <option value="hobbies">Hobbies</option>
            <option value="perfectMatch">Perfect Match</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchFilter;
