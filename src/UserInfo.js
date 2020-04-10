import React, { useState, useEffect } from "react";
import axios from "axios";

const UserInfo = ({ login }) => {
  const [careers, setCareers] = useState([]);

  const [userAge, setUserAge] = useState();
  const [userGender, setUserGender] = useState("-- select an option --");
  const [userSexualPreference, setUserSexualPreference] = useState(
    "-- select an option --"
  );
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
    if (confirmPassword !== password) {
      return setPasswordError("Please confirm correct password");
    } else {
      createUserInfo({
        userAge,
        userGender,
        userSexualPreference,
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
            <label htmlFor="age">What is your age?</label>
            <input
              className="form-control"
              type="text"
              id="age"
              onChange={(ev) => setUserAge(ev.target.value)}
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
              <option value="Agender">Agender</option>
              <option value="Androgyne">Androgyne</option>
              <option value="Androgynous">Androgynous</option>
              <option value="Bigender">Bigender</option>
              <option value="Cis">Cis</option>
              <option value="Cis Female">Cis Female</option>
              <option value="Cis Male">Cis Male</option>
              <option value="Cis Man">Cis Man</option>
              <option value="Cis Woman">Cis Woman</option>
              <option value="Cisgender">Cisgender</option>
              <option value="Cisgender Female">Cisgender Female</option>
              <option value="Cisgender Male">Cisgender Male</option>
              <option value="Cisgender Man">Cisgender Man</option>
              <option value="Cisgender Woman">Cisgender Woman</option>
              <option value="Female to Male">Female to Male</option>
              <option value="FTM">FTM</option>
              <option value="Gender Fluid">Gender Fluid</option>
              <option value="Gender Nonconforming">Gender Nonconforming</option>
              <option value="Gender Questioning">Gender Questioning</option>
              <option value="Gender Variant">Gender Variant</option>
              <option value="Genderqueer">Genderqueer</option>
              <option value="Intersex">Intersex</option>
              <option value="Male to Female">Male to Female</option>
              <option value="MTF">MTF</option>
              <option value="Neither">Neither</option>
              <option value="Neutrois">Neutrois</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
              <option value="Pangender">Pangender</option>
              <option value="Trans">Trans</option>
              <option value="Trans Female">Trans Female</option>
              <option value="Trans Male">Trans Male</option>
              <option value="Trans Man">Trans Man</option>
              <option value="Trans Person">Trans Person</option>
              <option value="Trans Woman">Trans Woman</option>
              <option value="Trans*">Trans*</option>
              <option value="Trans* Female">Trans* Female</option>
              <option value="Trans* Male">Trans* Male</option>
              <option value="Trans* Man">Trans* Man</option>
              <option value="Trans* Person">Trans* Person</option>
              <option value="Trans* Woman">Trans* Woman</option>
              <option value="Transfeminine">Transfeminine</option>
              <option value="Transgender">Transgender</option>
              <option value="Transgender Female">Transgender Female</option>
              <option value="Transgender Male">Transgender Male</option>
              <option value="Transgender Man">Transgender Man</option>
              <option value="Transgender Person">Transgender Person</option>
              <option value="Transgender Woman">Transgender Woman</option>
              <option value="Transmasculine">Transmasculine</option>
              <option value="Transsexual">Transsexual</option>
              <option value="Transsexual Female">Transsexual Female</option>
              <option value="Transsexual Male">Transsexual Male</option>
              <option value="Transsexual Man">Transsexual Man</option>
              <option value="Transsexual Person">Transsexual Person</option>
              <option value="Transsexual Woman">Transsexual Woman</option>
              <option value="'Two Spirit'">Two-spirit</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="orientation">Who do you prefer?</label>
            <select
              className="form-control"
              id="orientation"
              defaultValue
              onChange={(ev) => setUserSexualAffiliation(ev.target.value)}
            >
              <option value={userSexualPreference}>
                {userSexualPreference}
              </option>

              <option value="Agender">Agender</option>
              <option value="Androgyne">Androgyne</option>
              <option value="Androgynous">Androgynous</option>
              <option value="Bigender">Bigender</option>
              <option value="Cis">Cis</option>
              <option value="Cis Female">Cis Female</option>
              <option value="Cis Male">Cis Male</option>
              <option value="Cis Man">Cis Man</option>
              <option value="Cis Woman">Cis Woman</option>
              <option value="Cisgender">Cisgender</option>
              <option value="Cisgender Female">Cisgender Female</option>
              <option value="Cisgender Male">Cisgender Male</option>
              <option value="Cisgender Man">Cisgender Man</option>
              <option value="Cisgender Woman">Cisgender Woman</option>
              <option value="Female to Male">Female to Male</option>
              <option value="FTM">FTM</option>
              <option value="Gender Fluid">Gender Fluid</option>
              <option value="Gender Nonconforming">Gender Nonconforming</option>
              <option value="Gender Questioning">Gender Questioning</option>
              <option value="Gender Variant">Gender Variant</option>
              <option value="Genderqueer">Genderqueer</option>
              <option value="Intersex">Intersex</option>
              <option value="Male to Female">Male to Female</option>
              <option value="MTF">MTF</option>
              <option value="Neither">Neither</option>
              <option value="Neutrois">Neutrois</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
              <option value="Pangender">Pangender</option>
              <option value="Trans">Trans</option>
              <option value="Trans Female">Trans Female</option>
              <option value="Trans Male">Trans Male</option>
              <option value="Trans Man">Trans Man</option>
              <option value="Trans Person">Trans Person</option>
              <option value="Trans Woman">Trans Woman</option>
              <option value="Trans*">Trans*</option>
              <option value="Trans* Female">Trans* Female</option>
              <option value="Trans* Male">Trans* Male</option>
              <option value="Trans* Man">Trans* Man</option>
              <option value="Trans* Person">Trans* Person</option>
              <option value="Trans* Woman">Trans* Woman</option>
              <option value="Transfeminine">Transfeminine</option>
              <option value="Transgender">Transgender</option>
              <option value="Transgender Female">Transgender Female</option>
              <option value="Transgender Male">Transgender Male</option>
              <option value="Transgender Man">Transgender Man</option>
              <option value="Transgender Person">Transgender Person</option>
              <option value="Transgender Woman">Transgender Woman</option>
              <option value="Transmasculine">Transmasculine</option>
              <option value="Transsexual">Transsexual</option>
              <option value="Transsexual Female">Transsexual Female</option>
              <option value="Transsexual Male">Transsexual Male</option>
              <option value="Transsexual Man">Transsexual Man</option>
              <option value="Transsexual Person">Transsexual Person</option>
              <option value="Transsexual Woman">Transsexual Woman</option>
              <option value="'Two Spirit'">Two-spirit</option>
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
              id="religiousAffiliation"
              defaultValue
              onChange={(ev) => setUserReligiousAffiliation(ev.target.value)}
            >
              <option value={userReligiousAffiliation}>
                {userReligiousAffiliation}
              </option>

              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Nonreligious">Nonreligious</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Chinese traditional">Chinese traditional</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Primal-indigenous">Primal-indigenous</option>
              <option value="African traditional">African traditional</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Juche">Juche</option>
              <option value="Spiritism">Spiritism</option>
              <option value="Judaism">Judaism</option>
              <option value="Bahai">Bahai</option>
              <option value="Jainism">Jainism</option>
              <option value="Shinto">Shinto</option>
              <option value="Cao Dai">Cao Dai</option>
              <option value="Zoroastrianism">Zoroastrianism</option>
              <option value="Tenrikyo">Tenrikyo</option>
              <option value="Neo-Paganism">Neo-Paganism</option>
              <option value="Unitarian-Universalism">
                Unitarian-Universalism
              </option>
              <option value="other">other</option>
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
