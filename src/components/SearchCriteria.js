import React, { useState, useReducer } from 'react';
import axios from 'axios';

const SearchCriteria = ({ user }) => {
    const [criteria, setCriteria] = useState([
        {
          first_name: "",
          last_name: "",
          password: ""
        }
      ]);
      const [criteria, setcriteria] = useState([
        {
          first_name: "",
          last_name: "",
          password: ""
        }
      ]);
      const [error, setError] = useState("");
    
      const [inputCriteria, setInputCriteria] = useReducer(
        (criteria, setCriteria) => ({ ...criteria, ...setCriteria }),
        {
          first_name: criteria.first_name,
          last_name: criteria.last_name,
          password: criteria.password
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
              first_name: "",
              last_name: "",
              password: ""
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
                placeholder="first name"
                name="first_name"
                value={inputCriteria.first_name}
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
