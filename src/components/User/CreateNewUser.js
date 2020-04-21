import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateNewUser = ({ login }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const history = useHistory();
  const goToUploadPhoto = () => history.push('/file/upload');

  const createUser = (user) => {
    axios.post('/api/users', user).then((response) => {
      console.log('resp', response.data);
      login({ email, password }).catch((ex) =>
        setError(ex.response.data.message)
      );
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (confirmPassword !== password) {
      return setPasswordError('Please confirm correct password');
    } else {
      createUser({
        firstname,
        lastname,
        username,
        // zipcode,
        email,
        phone,
        password,
        // birthday,
        // gender,
      });
      goToUploadPhoto();
    }
  };
  return (
    <div className="container-sm">
      <hr />
      <h1>Join the Fam!</h1>
      <form className="w-50" onSubmit={onSubmit}>
        <div className="row ">
          <div className="col">
            <input
              value={firstname}
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(ev) => setFirstname(ev.target.value)}
            />
          </div>
          <div className="col">
            <input
              value={lastname}
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(ev) => setLastname(ev.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            className="form-control"
            type="text"
            placeholder="Username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label>Zipcode</label>
          <input
            value={zipcode}
            className="form-control"
            type="text"
            placeholder="Zipcode"
            onChange={(ev) => setZipcode(ev.target.value)}
          />
        </div> */}
        <div className="form-group">
          <label>Phone number</label>
          <input
            value={phone}
            className="form-control"
            type="text"
            placeholder="Phone number"
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail1">Email address</label>
          <input
            value={email}
            type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword1">Password</label>
          <input
            value={password}
            type="password"
            className="form-control"
            id="inputPassword1"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label htmlFor="inputConfirmPassword1">Confirm password</label>
          <input
            value={confirmPassword}
            type="password"
            className="form-control"
            id="inputConfirmPassword1"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
          />
          <div>{passwordError}</div>
        </div>
        {/* <div className="form-group">
          <label>Birthday</label>
          <input
            value={birthday}
            className="form-control"
            type="date"
            placeholder="Birthday"
            onChange={(ev) => setBirthday(ev.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            value={gender}
            className="form-control"
            placeholder="Gender"
            onChange={(ev) => setGender(ev.target.value)}
          >
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </select>
          {gender}
        </div> */}

        <button className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};

export default CreateNewUser;
