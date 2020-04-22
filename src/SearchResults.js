import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ auth }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    // gets zip code of current user
    axios
      .get('/api/profiles')
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  const userZip = profile.zipcode;
  useEffect(() => {
    // find userids of profiles with same zip code
    axios.get('/api/profiles').then((response) => setProfiles(response.data));
  }, []);

  const userProfiles = profiles.filter(
    (p) => p.zipcode === userZip && p.userId !== auth.id
  );

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));
  }, []);

  const getUsername = (id) => {
    const user = users.find((u) => u.id === id);
    return user.username;
  };

  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);

  const getCareerName = (cid) => {
    const career = careers.find((c) => c.id === cid);
    return career.career_name;
  };

  function findAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div>
      <h3>Results</h3>
      <div>
        <form>
          <h5>Users in your zip code</h5>
        </form>
      </div>
      <div>
        {userProfiles.map((userProfile) => (
          <ul key={userProfile.id}>
            User: {getUsername(userProfile.userId)}{' '}
            <input
              type="checkbox"
              name={userProfile.id}
              value={userProfile.userId}
            />
            <li>Gender: {userProfile.gender}</li>
            <li>Politics: {userProfile.politicalaffiliation}</li>
            <li>Religion: {userProfile.religiousaffiliation}</li>
            <li>Education: {userProfile.education}</li>
            <li>Career: {getCareerName(userProfile.careerid)}</li>
            <li>Pets: {userProfile.pets}</li>
            <li>Age: {findAge(userProfile.birthdate)}</li>
            <li>Employment: {userProfile.employmentstatus}</li>
            <li>About: {userProfile.about}</li>
            <li>Photo: </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
