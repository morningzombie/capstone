import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const SearchCriteria = ({ user }) => {
  const [careers, setCareers] = useState([]);
  // const [employmentStatus, setEmploymentStatus] = useState([]);
  const [gender, setGender] = useState([]);
  const [pets, setPets] = useState([]);
  const [politicalParties, setPoliticalParties] = useState([]);
  const [religions, setReligions] = useState([]);

  const [userAgeRange, setUserAgeRange] = useState();
  const [userGender, setUserGender] = useState('-- select an option --');
  // const [userSexualPreference, setUserSexualPreference] = useState(
  //   '-- select an option --'
  // );
  const [userPoliticalAffiliation, setUserPoliticalAffiliation] = useState(
    '-- select an option --'
  );
  const [userReligiousAffiliation, setUserReligiousAffiliation] = useState(
    '-- select an option --'
  );

  const [userCareer, setUserCareer] = useState('-- select an option --');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [userPets, setUserPets] = useState('-- select an option --');
  const [userAbout, setUserAbout] = useState('');

  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);

  const createUserInfo = (user) => {
    axios.post('/api/users', user).then((response) => {
      console.log(response);
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
      createUserInfo({
        userAgeRange,
        userGender,
        // userSexualPreference,
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
      <h3>Tell Us Who You Want to Hang With</h3>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="career">What is their occupation?</label>
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
            <label htmlFor="employmentStatus">Their employment status?</label>
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
          <label htmlFor="pets">Do they have pets?</label>
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
            <label htmlFor="age">What is their age?</label>
            <input
              className="form-control"
              type="text"
              id="age"
              onChange={(ev) => setUserAgeRange(ev.target.value)}
            />
          </div>

          <div className="col">
            {' '}
            <label htmlFor="gender">Their gender?</label>
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
        </div>

        <div className="row mt-3">
          <div className="col">
            {' '}
            <label htmlFor="politicalAffiliation">
              What is their political affiliation?
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
              What is their religious affiliation?
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

        {/* <div className="form-group mt-3">
          <label htmlFor="about">Tell us more!</label>
          <textarea
            className="form-control"
            type="text"
            id="about"
            rows="5"
            onChange={(ev) => setUserAbout(ev.target.value)}
          />
        </div> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  // const [genders, setGenders] = useState([]);
  // useEffect(() => {
  //   axios.get('/api/genders').then((response) => setGenders(response.data));
  // }, []);
  // const [careers, setCareers] = useState([]);
  // useEffect(() => {
  //   axios.get('/api/careers').then((response) => setCareers(response.data));
  // }, []);
  // const [criteria, setCriteria] = useState([
  //   {
  //     gender: '',
  //     orientation: '',
  //     politicalAffiliation: '',
  //     religiousAffiliation: '',
  //     careerId: '',
  //     education: '',
  //     pets: '',
  //     ageRange: '',
  //     employmentStatus: '',
  //     hobbies: '',
  //     zipCode: '',
  //   },
  // ]);
  // const [error, setError] = useState('');
  // const [inputCriteria, setInputCriteria] = useReducer(
  //   (criteria, setCriteria) => ({ ...criteria, ...setCriteria }),
  //   {
  //     gender: criteria.gender,
  //     orientation: criteria.orientation,
  //     politicalAffiliation: criteria.politicalAffiliation,
  //     religiousAffiliation: criteria.religiousAffiliation,
  //     careerId: criteria.careerId,
  //     education: criteria.education,
  //     pets: criteria.pets,
  //     ageRange: criteria.ageRange,
  //     employmentStatus: criteria.employmentStatus,
  //     hobbies: criteria.hobbies,
  //     zipCode: criteria.zipCode,
  //   }
  // );
  // const handleChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setInputCriteria({ [name]: value });
  // };
  // const createCriteria = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post('/api/createCriteria', inputCriteria)
  //     .then((response) => setCriteria([response.data, ...criteria]))
  //     .then(() =>
  //       setInputCriteria({
  //         gender: '-- select an option --',
  //         politicalAffiliation: '-- select an option --',
  //         religiousAffiliation: '-- select an option --',
  //         careerId: '-- select an option --',
  //         education: '-- select an option --',
  //         pets: '-- select an option --',
  //         ageRange: '-- select an option --',
  //         employmentStatus: '-- select an option --',
  //         hobbies: '-- select an option --',
  //         zipCode: '',
  //       })
  //     )
  //     .catch(Error);
  // };
  // return (
  //   <div>
  //     <div className="box-background lower">
  //       <form onSubmit={(ev) => createCriteria(ev)}>
  //         <h2 className="white-text">Who do you wanna hang with?</h2>
  //         <div>
  //           <select
  //             className="form-control"
  //             id="gender"
  //             placeholder="Gender"
  //             name="gender"
  //             defaultValue
  //             onChange={handleChange}
  //           >
  //             <option value={userCareer}>{userCareer}</option>
  //             <option value={inputCriteria.gender}>{genders}</option>
  //             {genders.map((gender) => {
  //               return (
  //                 <option key={gender.id} value={gender.gender_name}>
  //                   {gender.gender_name}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //         </div>
  //         {/* <div className="error">{error}</div>
  //         <label htmlFor="career">What type of person?</label>
  //         <select
  //           className="form-control"
  //           id="gender"
  //           placeholder="Gender"
  //           name="gender"
  //           defaultValue
  //           onChange={handleChange}
  //         >
  //           <option value={inputCriteria.gender}>{genders}</option>
  //           {genders.map((gender) => {
  //             return (
  //               <option key={gender.id} value={gender.gender_name}>
  //                 {gender.gender_name}
  //               </option>
  //             );
  //           })}
  //         </select>
  //         <input
  //           placeholder="last name"
  //           name="last_name"
  //           value={inputCriteria.last_name}
  //           onChange={handleChange}
  //         />
  //         <div className="col">
  //           <label htmlFor="career">What do they do for a living?</label>
  //           <select
  //             className="form-control"
  //             id="career"
  //             defaultValue
  //             onChange={handleChange}
  //           >
  //             <option value={inputCriteria.career}>{careers}</option>
  //             {careers.map((career) => {
  //               return (
  //                 <option key={career.id} value={career.career_name}>
  //                   {career.career_name}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //         </div>
  //         <div className="col">
  //           <label htmlFor="employmentStatus">
  //             What is their employment status?
  //           </label>
  //           <select
  //             className="form-control"
  //             id="employmentStatus"
  //             defaultValue
  //             onChange={handleChange}
  //           >
  //             <option value={inputCriteria.employmentStatus}>
  //               {inputCriteria.employmentStatus}
  //             </option>
  //             <option value="full-time">Full-Time</option>
  //             <option value="part-time">Part-Time</option>
  //             <option value="unemployed">Unemployed</option>
  //             <option value="in-school">In Schoool</option>
  //             <option value="freelance">Freelance</option>
  //             <option value="looking">Looking...</option>
  //           </select>
  //         </div>
  //         <input
  //           placeholder="password"
  //           name="password"
  //           value={inputCriteria.password}
  //           onChange={handleChange}
  //           required
  //         />
  //         <button className="button5" type="submit">
  //           <h3>Search</h3>
  //         </button> */}
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default SearchCriteria;
