import React, { useState, useReducer } from 'react';
import axios from 'axios';

const SearchCriteria = ({ user }) => {
    const [criteria, setCriteria] = useState([
        {
          gender: "", 
          orientation: "", 
          politicalAffiliation: "", 
          religiousAffiliation: "", 
          careerId: "", 
          education: "", 
          pets: "", 
          ageRange: "", 
          employmentStatus : "", 
          hobbies: "",
          zipCode: ""
          //gender: "", orientation: "", politicalAffiliation: "", 
      //religiousAffiliation,: "", careerId: "", education: "", pets: "", ageRange,: "", employmentStatus : ""
        }
      ]);

      //communicationPreference, gender, orientation, politicalAffiliation, 
      //religiousAffiliation, careerId, education, pets, age, employmentStatus
      const [error, setError] = useState("");
    
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
          employmentStatus : criteria.employmentStatus, 
          hobbies: criteria.hobbies, 
          zipCode: criteria.zipCode
        }
      );
      const handleChange = evt => {
        const { name, value } = evt.target;
        setUserInput({ [name]: value });
      };
    
      const createCriteria = event => {
        event.preventDefault();
        axios
          .post("/api/createCriteria", userCriteria)
          .then(response => setCriteria([response.data, ...criteria]))
          .then(() =>
            setInputCriteria({
              gender: "", 
          orientation: "", 
          politicalAffiliation: "", 
          religiousAffiliation: "", 
          careerId: "", 
          education: "", 
          pets: "", 
          ageRange: "", 
          employmentStatus : "", 
          hobbies: "",
          zipCode: ""
            })
          )
          .catch(Error);
      };
    return (
        <div>
          <div className="box-background lower">
            <form onSubmit={ev => createCriteria(ev)}>
              <h2 className="white-text">Who do you wanna hang with?</h2>
              <div className="error">{error}</div>
              <input
                placeholder="Gender"
                name="gender"
                value={inputCriteria.gender}
                onChange={handleChange}
                required
              />
              <input
                placeholder="last name"
                name="last_name"
                value={inputCriteria.last_name}
                onChange={handleChange}
              />
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
};

export default SearchCriteria;
