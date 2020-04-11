import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const SearchCriteria = ({ user }) => {
  const [genders, setGenders] = useState([]);
  useEffect(() => {
    axios.get('/api/genders').then((response) => setGenders(response.data));
  }, []);

  const [careers, setCareers] = useState([]);

  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);

  const [criteria, setCriteria] = useState([
    {
      gender: '',
      orientation: '',
      politicalAffiliation: '',
      religiousAffiliation: '',
      careerId: '',
      education: '',
      pets: '',
      ageRange: '',
      employmentStatus: '',
      hobbies: '',
      zipCode: '',
    },
  ]);

  const [error, setError] = useState('');

  const [inputCriteria, setInputCriteria] = useReducer(
    (criteria, setCriteria) => ({ ...criteria, ...setCriteria }),
    {
      gender: criteria.gender,
      orientation: criteria.orientation,
      politicalAffiliation: criteria.politicalAffiliation,
      religiousAffiliation: criteria.religiousAffiliation,
      careerId: criteria.careerId,
      education: criteria.education,
      pets: criteria.pets,
      ageRange: criteria.ageRange,
      employmentStatus: criteria.employmentStatus,
      hobbies: criteria.hobbies,
      zipCode: criteria.zipCode,
    }
  );
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputCriteria({ [name]: value });
  };

  const createCriteria = (event) => {
    event.preventDefault();
    axios
      .post('/api/createCriteria', inputCriteria)
      .then((response) => setCriteria([response.data, ...criteria]))
      .then(() =>
        setInputCriteria({
          gender: '-- select an option --',
          politicalAffiliation: '-- select an option --',
          religiousAffiliation: '-- select an option --',
          careerId: '-- select an option --',
          education: '-- select an option --',
          pets: '-- select an option --',
          ageRange: '-- select an option --',
          employmentStatus: '-- select an option --',
          hobbies: '-- select an option --',
          zipCode: '',
        })
      )
      .catch(Error);
  };
  return (
    <div>
      <div className="box-background lower">
        <form onSubmit={(ev) => createCriteria(ev)}>
          <h2 className="white-text">Who do you wanna hang with?</h2>

          <div className="error">{error}</div>
          <label htmlFor="career">What type of person?</label>
          <select
            className="form-control"
            id="gender"
            placeholder="Gender"
            name="gender"
            defaultValue
            onChange={handleChange}
          >
            <option value={inputCriteria.gender}>{genders}</option>

            {genders.map((gender) => {
              return (
                <option key={gender.id} value={gender.gender_name}>
                  {gender.gender_name}
                </option>
              );
            })}
          </select>
          <input
            placeholder="last name"
            name="last_name"
            value={inputCriteria.last_name}
            onChange={handleChange}
          />
          <div className="col">
            <label htmlFor="career">What do they do for a living?</label>
            <select
              className="form-control"
              id="career"
              defaultValue
              onChange={handleChange}
            >
              <option value={inputCriteria.career}>{careers}</option>

              {careers.map((career) => {
                return (
                  <option key={career.id} value={career.career_name}>
                    {career.career_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="employmentStatus">
              What is their employment status?
            </label>
            <select
              className="form-control"
              id="employmentStatus"
              defaultValue
              onChange={handleChange}
            >
              <option value={inputCriteria.employmentStatus}>
                {inputCriteria.employmentStatus}
              </option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="unemployed">Unemployed</option>
              <option value="in-school">In Schoool</option>
              <option value="freelance">Freelance</option>
              <option value="looking">Looking...</option>
            </select>
          </div>

          <input
            placeholder="password"
            name="password"
            value={inputCriteria.password}
            onChange={handleChange}
            required
          />
          <button className="button5" type="submit">
            <h3>Search</h3>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchCriteria;
