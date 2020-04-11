import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = ({ login, users }) => {
  console.log('login', login);
  const [careers, setCareers] = useState([]);
  const [religions, setReligions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [employmentStatus, setEmploymentStatus] = useState([]);
  const [politicalParties, setPoliticalParties] = useState([]);
  const [pets, setPets] = useState([]);

  const [userBirthdate, setUserBirthdate] = useState('');
  const [userGender, setUserGender] = useState('-- select an option --');
  const [userPoliticalAffiliation, setUserPoliticalAffiliation] = useState(
    '-- select an option --'
  );
  const [userReligiousAffiliation, setUserReligiousAffiliation] = useState(
    '-- select an option --'
  );
  const [userCareer, setUserCareer] = useState('-- select an option --');
  const [userEmploymentStatus, setUserEmploymentStatus] = useState(
    '-- select an option --'
  );
  const [userPets, setUserPets] = useState('-- select an option --');
  const [userAbout, setUserAbout] = useState('');
  // console.log("USER", user);
  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);
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
      .then((response) => setPoliticalParties(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/pets').then((response) => setPets(response.data));
  }, []);

  const email = login.email;
  const user = users.getUserIdFromEmail(email);

  const createUserInfo = (user) => {
    axios.post('/api/user_profiles', user).then((response) => {
      console.log('USERINFO', response);
      login({ email, password }).catch((ex) =>
        setError(ex.response.data.message)
      );
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    // if (confirmPassword !== password) {
    //   return setPasswordError("Please confirm correct password");
    // } else
    {
      createUserInfo({
        user,
        userGender,
        userPoliticalAffiliation,
        userReligiousAffiliation,
        userPets,
        userBirthdate,
        userEmploymentStatus,
        userAbout,
        userEducation,
        userZipcode,
      });
    }
  };
  return (
    <div className="container" onSubmit={onSubmit}>
      <h3>Tell Us All About You</h3>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="career">What is your occupation?</label>
            <select
              className="form-control"
              id="career"
              defaultValue
              onChange={(ev) => setUserCareer(ev.target.value)}
            >
              <option value={userCareer}>{userCareer}</option>
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
            <label htmlFor="employmentStatus">Employment Status?</label>
            <select
              className="form-control"
              id="employmentStatus"
              defaultValue
              onChange={(ev) => setUserEmploymentStatus(ev.target.value)}
            >
              <option value={userEmploymentStatus}>
                {userEmploymentStatus}
              </option>
              {employmentStatus.map((employ) => {
                return (
                  <option key={employ.id} value={employ.status_name}>
                    {employ.status_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="pets">Do you have pets?</label>
          <select
            className="form-control"
            id="pets"
            defaultValue
            onChange={(ev) => setUserPets(ev.target.value)}
          >
            <option value={userPets}>{userPets}</option>
            {pets.map((pet) => {
              return (
                <option key={pet.id} value={pet.pet_name}>
                  {pet.pet_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="birthdate">When is your birthday?</label>
            <input
              className="form-control"
              type="date"
              id="birthdate"
              onChange={(ev) => setUserBirthdate(ev.target.value)}
            />
          </div>

          <div className="col">
            {' '}
            <label htmlFor="gender">Your gender?</label>
            <select
              className="form-control"
              id="gender"
              defaultValue
              onChange={(ev) => setUserGender(ev.target.value)}
            >
              <option value={userGender}>{userGender}</option>
              {genders.map((gender) => {
                return (
                  <option key={gender.id} value={gender.gender_name}>
                    {gender.gender_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            {' '}
            <label htmlFor="politicalAffiliation">
              What is your political affiliation?
            </label>
            <select
              className="form-control"
              id="politicalAffiliation"
              defaultValue
              onChange={(ev) => setUserPoliticalAffiliation(ev.target.value)}
            >
              <option value={userPoliticalAffiliation}>
                {userPoliticalAffiliation}
              </option>
              {politicalParties.map((party) => {
                return (
                  <option key={party.id} value={party.party_name}>
                    {party.party_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="religiousAffiliation">
              What is your religious affiliation?
            </label>
            <select
              className="form-control"
              id="religion"
              defaultValue
              onChange={(ev) => setUserReligiousAffiliation(ev.target.value)}
            >
              <option value={userReligiousAffiliation}>
                {userReligiousAffiliation}
              </option>
              {religions.map((religion) => {
                return (
                  <option key={religion.id} value={religion.religion_name}>
                    {religion.religion_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="about">Tell us more!</label>
          <textarea
            className="form-control"
            type="text"
            id="about"
            rows="5"
            onChange={(ev) => setUserAbout(ev.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default UserInfo;
