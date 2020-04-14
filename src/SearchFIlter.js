import React from 'react';

const SearchFilter = ({ results, criteria }) => {
  return (
    <div>
      <form>
        <div className="form-group mt-3">
          <label htmlFor="about">Someone that shares my taste in:</label>
          <select
            type="text"
            id="ageRange"
            name="ageRange"
            value={criteriaInput.ageRange}
            onChange={handleChange}
          >
            <option value="teens">18 to 21</option>
            <option value="twenties">22 to 29</option>
            <option value="thirties">30 t0 39</option>
            <option value="forties">40 to 49</option>
            <option value="fifties">50 to 59 </option>
            <option value="sixties">60 to 69</option>
            <option value="seventies">70 to 79</option>
            <option value="goldenYears">80 and up</option>
            <option value="doesntMatter">Does Not Matter</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchFilter;
