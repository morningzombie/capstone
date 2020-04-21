import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ auth }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [photos, setPhotos] = useState([]);

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

  const findAge = (birthday) => {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    axios.get('/api/photos').then((response) => setPhotos(response.data));
  }, []);

  const getProfilePic = (friendId) => {
    const profilePic = photos.find((photo) => photo.id === friendId);
    const fileName = profilePic.fileName;
    const filePath = profilePic.filePath;
    const src = filePath + '/' + fileName;
    return src;
  };

  return (
    <div>
      <h3>
        Users in your zip code {userZip} ({userProfiles.length - 1})
      </h3>
      {/* <div>
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
      </div> */}
      <div>
        {userProfiles.map((userProfile) => {
          return (
            <div
              className="card"
              key={userProfile.id}
              style={{ width: '18rem' }}
            >
              <div className="card-body">
                <img
                  className="userPhoto"
                  src={getProfilePic(userProfile.userId)}
                />
                <h5 className="card-title">
                  {getUsername(userProfile.userId)}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Age {findAge(userProfile.birthdate)}
                </h6>
                <p className="card-text">{userProfile.gender}</p>
                <a href="#" className="card-link">
                  Save as Favorite
                </a>
                <a href="#" className="card-link">
                  View details
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
