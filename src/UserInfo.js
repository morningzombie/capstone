import React, { useState, useEffect } from "react";
import axios from "axios";

const UserInfo = ({ login, auth }) => {
  const [userid, setUserid] = useState("");
  const [careers, setCareers] = useState([]);
  const [religions, setReligions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [politicalParties, setPoliticalParties] = useState([]);
  const [pet, setPet] = useState([]);
  const [educations, setEducations] = useState([]);

  const [birthdate, setBirthdate] = useState("");
  const [zipCode, setZipCode] = useState("-- enter zipcode --");
  const [gender, setGender] = useState("-- select an option --");
  const [education, setEducation] = useState("-- select an option --");
  const [politicalAffiliation, setPoliticalAffiliation] = useState(
    "-- select an option --"
  );
  const [religiousAffiliation, setReligiousAffiliation] = useState(
    "-- select an option --"
  );
  const [careerId, setCareerId] = useState("-- select an option --");
  const [employmentStatus, setEmploymentStatus] = useState(
    "-- select an option --"
  );
  const [pets, setPets] = useState("-- select an option --");
  const [about, setAbout] = useState("");
  useEffect(() => {
    axios.get("/api/careers").then((response) => setCareers(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/religions").then((response) => setReligions(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/genders").then((response) => setGenders(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/employment_status")
      .then((response) => setEmployment(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/political_parties")
      .then((response) => setPoliticalParties(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/pets").then((response) => setPet(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/education")
      .then((response) => setEducations(response.data));
  }, []);

  const createUserInfo = (user) => {
    axios.post("/api/createProfile", user).then((response) => {
      console.log("USERINFO", response);
      // login({ email, password }).catch((ex) =>
      //   setError(ex.response.data.message)
      // );
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    {
      const userId = auth.id;
      createUserInfo({
        userId,
        gender,
        politicalAffiliation,
        religiousAffiliation,
        careerId,
        education,
        pets,
        birthdate,
        zipCode,
        employmentStatus,
        about,
      });
    }
  };

  // user_profile.userId,
  //     user_profile.gender,
  //     user_profile.orientation,
  //     user_profile.politicalAffiliation,
  //     user_profile.religiousAffiliation,
  //     user_profile.careerId,
  //     user_profile.education,
  //     user_profile.pets,
  //     user_profile.birthdate,
  //     user_profile.zipCode,
  //     user_profile.employmentStatus,
  return (
    <div className="container" onSubmit={onSubmit}>
      <h3>Tell Us All About You</h3>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="zipCode">Where do you live?</label>
            <br />
            <input
              placeholder=" -- enter zip code --"
              type="text"
              pattern="(\d{5}([\-]\d{4})?)"
              id="zipCode"
              onChange={(ev) => setZipCode(ev.target.value)}
            />
          </div>

          <div className="col">
            <label htmlFor="education">What is your education?</label>
            <select
              className="form-control"
              id="education"
              defaultValue
              onChange={(ev) => setEducation(ev.target.value)}
            >
              <option value={education}>{education}</option>
              {educations.map((school) => {
                return (
                  <option key={school.id} value={school.education_name}>
                    {school.education_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row  mt-3">
          <div className="col">
            <label htmlFor="career">What is your occupation?</label>
            <select
              className="form-control"
              id="career"
              defaultValue
              onChange={(ev) => setCareerId(ev.target.value)}
            >
              <option value={careerId}>{careerId}</option>
              {careers.map((career) => {
                return (
                  <option key={career.id} value={career.id}>
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
              {employment.map((employ) => {
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
            onChange={(ev) => setPets(ev.target.value)}
          >
            <option value={pets}>{pets}</option>
            {pet.map((p) => {
              return (
                <option key={p.id} value={p.pet_name}>
                  {p.pet_name}
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
              onChange={(ev) => setBirthdate(ev.target.value)}
            />
          </div>

          <div className="col">
            {" "}
            <label htmlFor="gender">Your gender?</label>
            <select
              className="form-control"
              id="gender"
              defaultValue
              onChange={(ev) => setGender(ev.target.value)}
            >
              <option value={gender}>{gender}</option>
              {genders.map((g) => {
                return (
                  <option key={g.id} value={g.gender_name}>
                    {g.gender_name}
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
              onChange={(ev) => setPoliticalAffiliation(ev.target.value)}
            >
              <option value={politicalAffiliation}>
                {politicalAffiliation}
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
              onChange={(ev) => setReligiousAffiliation(ev.target.value)}
            >
              <option value={religiousAffiliation}>
                {religiousAffiliation}
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
            onChange={(ev) => setAbout(ev.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default UserInfo;
