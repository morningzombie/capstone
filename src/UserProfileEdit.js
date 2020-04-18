import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import DeleteAccountPopUp from './components/User/DeleteAccountPopUp';

const UserProfileEdit = ({ logout, auth, params }) => {
  const deleteAccount = () => {
    axios.delete(`/api/users/${auth.id}`);
  };

  useEffect(() => {
    axios
      .get('/api/profiles')
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);

  const [error, setError] = useState('');
  const [profile, setProfile] = useState([]);
  console.log('GP', profile.gender);
  console.log('ID', auth.id);
  console.log('ID2', profile.userId);

  const [editedUserProfile, setEditedUserProfile] = useState({
    gender: profile.gender,
    politicalAffiliation: profile.politicalAffiliation,
    religiousAffiliation: profile.religiousAffiliation,
    education: profile.education,
    pets: profile.pets,
    birthdate: profile.birthdate,
    zipcode: profile.zipcode,
    employmentstatus: profile.employmentStatus,
    about: profile.about,
    communicationpreference: profile.communicationPreference,
  });
  console.log('gender', editedUserProfile.gender);
  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setEditedUserProfile({ ...editedUserProfile, ...change });
  };

  const updateProfile = (profile) => {
    axios
      .put(`/api/user_profiles/${auth.id}`, profile)
      .then((response) => {
        console.log(response.data, 'response data');
        setAuth(response.data);
      })
      .catch((ex) => setError(ex.response.data.message));
  };
  const onSubmit = (ev) => {
    // ev.preventDefault();
    updateProfile(editedUserProfile);
  };
  return (
    <div className="container">
      <h3 className="userName">
        All About {auth.username}{' '}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >
          Delete my account
        </button>
      </h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Account Ownership</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Name: {auth.firstname} {auth.lastname}
            </li>
            <li className="list-group-item">Username: {auth.username}</li>
            <li className="list-group-item">email: {auth.email}</li>
            <li className="list-group-item">Phone: {auth.phone}</li>
          </ul>
          <Link to="/useraccount/edit" className="card-link">
            Edit
          </Link>
        </div>
      </div>
      {/* //============CHANGE PASSWORD===============// */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Would you like to reset your password?{' '}
            <Link to="/useraccount/password" className="btn btn-primary btn-sm">
              Change password
            </Link>
          </h5>
        </div>
      </div>

      <DeleteAccountPopUp
        auth={auth}
        deleteAccount={deleteAccount}
        logout={logout}
      />
      {/* //============MORE INFO===============// */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Personal Information</h5>
          <label>Gender:</label>
          <input
            name="gender"
            value={editedUserProfile.gender}
            className="form-control"
            type="text"
            placeholder={profile.gender}
            onChange={onChange}
          />

          <label>Political Affiliation:</label>
          <input
            name="politicalaffiliation"
            value={profile.politicalAffiliation}
            className="form-control"
            type="text"
            placeholder={profile.politicalaffiliation}
            onChange={onChange}
          />

          <label>Religious Affiliation:</label>
          <input
            name="religiousaffiliation"
            value={profile.religiousAffiliation}
            className="form-control"
            type="text"
            placeholder={profile.religiousaffiliation}
            onChange={onChange}
          />

          <label>Education:</label>
          <input
            name="education"
            value={profile.Education}
            className="form-control"
            type="text"
            placeholder={profile.education}
            onChange={onChange}
          />

          <label>Pets:</label>
          <input
            name="pets"
            value={profile.Pets}
            className="form-control"
            type="text"
            placeholder={profile.pets}
            onChange={onChange}
          />
          <label>Birthdate:</label>
          <input
            name="birthdate"
            value={profile.birthDate}
            className="form-control"
            type="text"
            placeholder={profile.birthdate}
            onChange={onChange}
          />
          <label>Zipcode: </label>
          <input
            name="zipcode"
            value={profile.zipCode}
            className="form-control"
            type="text"
            placeholder={profile.zipcode}
            onChange={onChange}
          />
          <label>Employment Status:</label>
          <input
            name="employmentstatus"
            value={profile.employmentStatus}
            className="form-control"
            type="text"
            placeholder={profile.employmentstatus}
            onChange={onChange}
          />
          <label>About:</label>
          <input
            name="about"
            value={profile.About}
            className="form-control"
            type="text"
            placeholder={profile.about}
            onChange={onChange}
          />

          <label>I prefer to be contacted by: </label>
          <input
            name="communicationpreference"
            value={profile.communicationPreference}
            className="form-control"
            type="text"
            placeholder={profile.communicationpreference}
            onChange={onChange}
          />
          {/* careerid: "7196afea-99c0-46b5-8bcf-f33e526a5467" */}

          <Link className="btn" to="/userinfo" label="UserProfileEdit">
            Submit
          </Link>
        </div>{' '}
      </div>
    </div>
  );
};
export default UserProfileEdit;
