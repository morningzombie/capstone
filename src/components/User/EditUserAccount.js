import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import UpdatePopUp from './UpdatePopUp';

const EditUserAccount = ({ auth, setAuth }) => {
  // const [seen, setSeen] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const [error, setError] = useState('');
  const [editedUser, setEditedUser] = useState({
    firstname: auth.firstname,
    lastname: auth.lastname,
    username: auth.username,
    email: auth.email,
    phone: auth.phone,
    // zipcode: auth.zipcode,
    // birthday: auth.birthday,
    // gender: auth.gender,
  });

  // useEffect(() => {
  //   console.log('use effect');
  // }, [auth]);

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setEditedUser({ ...editedUser, ...change });
  };

  const updateUser = (user) => {
    axios
      .put(`/api/users/${auth.id}`, user)
      .then((response) => {
        // console.log(response.data, 'response data');
        setAuth(response.data);
      })
      .catch((ex) => setError(ex.response.data.message));
  };

  const onSubmit = (ev) => {
    // ev.preventDefault();
    updateUser(editedUser);
  };
  console.log(auth, 'auth');
  return (
    <div className="container-sm">
      <hr />
      {cancelMessage}
      <h1>Edit your profile</h1>
      <form className="w-50">
        <div className="row form-group">
          <div className="col">
            <input
              name="firstname"
              value={editedUser.firstname}
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={onChange}
            />
          </div>
          <div className="col">
            <input
              name="lastname"
              value={editedUser.lastname}
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            name="username"
            value={editedUser.username}
            className="form-control"
            type="text"
            placeholder="Username"
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <input
            name="zipcode"
            value={editedUser.zipcode}
            className="form-control"
            type="text"
            placeholder="Zipcode"
            onChange={onChange}
          />
        </div> */}
        <div className="form-group">
          <input
            name="email"
            value={editedUser.email}
            type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            This email will be used as your login email.
          </small>
        </div>
        <div className="form-group">
          <input
            name="phone"
            value={editedUser.phone}
            className="form-control"
            type="text"
            placeholder="Phone"
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <input
            name="birthday"
            value={moment(editedUser.birthday).format('YYYY-MM-DD')}
            className="form-control"
            type="date"
            placeholder="Birthday"
            onChange={onChange}
          />
        </div> */}
        {/* <div className="form-group">
          <select
            name="gender"
            value={editedUser.gender}
            className="form-control"
            placeholder="Gender"
            onChange={onChange}
          >
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div> */}
        {/* <Link
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          to="/useraccount"
        >
          Edit Account
        </Link> */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Edit Account
        </button>
        <Link to="/useraccount" className="btn">
          Cancel
        </Link>
      </form>
      <UpdatePopUp onSubmit={onSubmit} setCancelMessage={setCancelMessage} />
      {/* {!seen ? <UpdatePopUp onSubmit={onSubmit} setSeen={setSeen} /> : null} */}
    </div>
  );
};

export default EditUserAccount;
