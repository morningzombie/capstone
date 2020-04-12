import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const SearchCriteria = ({ user }) => {
  const [criteria, setCriteria] = useState([
    {
      carreerId: '',
      employmentStatus: '',
      pets: '',
      ageRange: '',
      gender: '',
      politicalAffiliation: '',
      religiousAffiliation: '',
      zipCode: '',
    },
  ]);

  const [criteriaInput, setCriteriaInput] = useReducer(
    (criteria, setCriteriaInput) => ({ ...criteria, ...setCriteriaInput }),
    {
      carreerId: '',
      employmentStatus: '',
      pets: '',
      ageRange: '',
      gender: '',
      politicalAffiliation: '',
      religiousAffiliation: '',
      zipCode: '',
    }
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setCriteriaInput({ [name]: value });
  };
  const [careers, setCareers] = useState([]);
  const [religions, setReligions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [employmentStatus, setEmploymentStatus] = useState([]);
  const [politicalAffiliation, setPoliticalAffiliation] = useState([]);
  const [pets, setPets] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [ageRange, setAgeRange] = useState('');

  useEffect(() => {
    axios.get('/api/religions').then((response) => setReligions(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/genders').then((response) => setGenders(response.data));
  }, []);
  useEffect(() => {
    axios
      .get('/api/employment_status')
      .then((response) => setEmploymentStatus(response.data));
  }, []);
  useEffect(() => {
    axios
      .get('/api/political_parties')
      .then((response) => setPoliticalAffiliation(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/pets').then((response) => setPets(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/hobbies').then((response) => setHobbies(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);
  const onSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post('/api/search/criteria', criteriaInput)
      .then((response) => setCriteria([response.data, ...criteria]));
  };
  return (
    <div className="container" onSubmit={onSubmit}>
      <h3>Tell Us Who You Want to Hang With</h3>
      <form>
        <div>
          <label htmlFor="career">Where do they live?</label>
          <input
            placeholder="Zip Code"
            type="text"
            pattern="(\d{5}([\-]\d{4})?)"
            id="zipCode"
            name="zipCode"
            value={criteriaInput.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="career">What is their occupation?</label>
            <select
              className="form-control"
              id="careerId"
              name="careerId"
              value={criteriaInput.careerId}
              onChange={handleChange}
            >
              {careers.map((career) => {
                return <option key={career.id}>{career.career_name}</option>;
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="employmentStatus">Their employment status?</label>
            <select
              className="form-control"
              id="employmentStatus"
              name="employmentStatus"
              value={criteriaInput.employmentStatus}
              onChange={handleChange}
            >
              {employmentStatus.map((status) => {
                return <option key={status.id}>{status.status_name}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="pets">Do they have pets?</label>
          <select
            className="form-control"
            id="pets"
            name="pets"
            value={criteriaInput.pets}
            onChange={handleChange}
          >
            {pets.map((pet) => {
              return <option key={pet.id}>{pet.pet_name}</option>;
            })}
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="age">What is their age?</label>
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

          <div className="col">
            {' '}
            <label htmlFor="gender">Their gender?</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={criteriaInput.gender}
              onChange={handleChange}
            >
              {genders.map((gender) => {
                return <option key={gender.id}>{gender.gender_name}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            {' '}
            <label htmlFor="politicalAffiliation">
              What is their political affiliation?
            </label>
            <select
              className="form-control"
              id="politicalAffiliation"
              name="politicalAffiliation"
              value={criteriaInput.politicalAffiliation}
              onChange={handleChange}
            >
              {politicalAffiliation.map((party) => {
                return <option key={party.id}>{party.party_name}</option>;
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="religiousAffiliation">
              What is their religious affiliation?
            </label>
            <select
              className="form-control"
              id="religiousAffiliation"
              value={criteriaInput.religiousAffiliation}
              onChange={handleChange}
            >
              {religions.map((religion) => {
                return (
                  <option key={religion.id}>{religion.religion_name}</option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="hobby">What is their hobby?</label>
            <select
              className="form-control"
              id="hobby"
              value={criteriaInput.hobby}
              onChange={handleChange}
            >
              {hobbies.map((hobby) => {
                return <option key={hobby.id}>{hobby.hobby_name}</option>;
              })}
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchCriteria;
