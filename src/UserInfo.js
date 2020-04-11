import React, { useState, useEffect } from "react";
import axios from "axios";

const UserInfo = ({ login }) => {
  const [careers, setCareers] = useState([]);
  const [religions, setReligions] = useState([]);
  const [genders, setGenders] = useState([]);

  const [userBirthday, setUserBirthday] = useState("");
  const [userGender, setUserGender] = useState("-- select an option --");
  const [userPoliticalAffiliation, setUserPoliticalAffiliation] = useState(
    "-- select an option --"
  );
  const [userReligiousAffiliation, setUserReligiousAffiliation] = useState(
    "-- select an option --"
  );
  const [userCareer, setUserCareer] = useState("-- select an option --");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [userPets, setUserPets] = useState("-- select an option --");
  const [userAbout, setUserAbout] = useState("");

  useEffect(() => {
    axios.get("/api/careers").then((response) => setCareers(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/religions").then((response) => setReligions(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/genders").then((response) => setGenders(response.data));
  }, []);
  const createUserInfo = (user) => {
    axios.post("/api/users", user).then((response) => {
      console.log(response);
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
        userBirthday,
        userGender,
        userPoliticalAffiliation,
        userReligiousAffiliation,
        userCareer,
        userPets,
        userAbout,
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
              onChange={(ev) => setEmploymentStatus(ev.target.value)}
            >
              <option value={employmentStatus}>{employmentStatus}</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="unemployed">Unemployed</option>
              <option value="in-school">In Schoool</option>
              <option value="freelance">Freelance</option>
              <option value="looking">Looking...</option>
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
            <option value="bird">Bird</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="hamster">Hamster</option>
            <option value="horse">Horse</option>
            <option value="rabbit">Rabbit</option>
            <option value="reptile">Reptile</option>
            <option value="other">Other</option>
            <option value="na">No Pets</option>
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="birthday">When is your birthday?</label>
            <input
              className="form-control"
              type="date"
              id="birthday"
              onChange={(ev) => setUserBirthday(ev.target.value)}
            />
          </div>

          <div className="col">
            {" "}
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
            {" "}
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
              <option value="democrat">Democrat</option>
              <option value="independent">Independent</option>
              <option value="republican">Republican</option>
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
