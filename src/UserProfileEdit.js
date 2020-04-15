import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const UserProfileEdit = ({ auth, setAuth }) => {
  const [cancelMessage, setCancelMessage] = useState("");
  const [error, setError] = useState("");
  const [editedUser, setEditedUser] = useState({
    zipcode: auth.zipcode,
    birthdate: auth.birthdate,
    gender: auth.gender,
  });

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setEditedUser({ ...editedUser, ...change });
  };

  const updateUser = (user) => {
    axios
      .put(`/api/users/${auth.id}`, user)
      .then((response) => {
        setAuth(response.data);
      })
      .catch((ex) => setError(ex.response.data.message));
  };

  const onSubmit = (ev) => {
    // ev.preventDefault();
    updateUser(editedUser);
  };
  console.log(auth, "auth");
  return (
    <div className="container-sm">
      <hr />
      {cancelMessage}
      <h1>Edit your profile</h1>
      <form className="w-50">
        <div className="form-group">
          <input
            name="zipcode"
            value={editedUser.zipcode}
            className="form-control"
            type="text"
            placeholder="Zipcode"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            name="birthday"
            value={moment(editedUser.birthdate).format("YYYY-MM-DD")}
            className="form-control"
            type="date"
            placeholder="Birthday"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
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
        </div>
        <Link
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          to="/useraccount"
        >
          Edit Account
        </Link>
      </form>
    </div>
  );
};

export default UserProfileEdit;
