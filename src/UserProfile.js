import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = (auth) => {
  const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState([]);

  const [photo, setPhoto] = useState([]);

  console.log(profiles);
  const userId = auth.auth.id;

  useEffect(() => {
    axios.get("/api/profiles").then((response) => setProfiles(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/users").then((response) => setUsers(response.data));
  }, []);
  return (
    <div>
      <h3>All About Me</h3>

      <div className="form-group d-flex flex-wrap align-content-around">
        <div className="">
          {users.map((user) => {
            return (
              <div key={user.id} className="">
                <p className="">{user.first_name}</p>
              </div>
            );
          })}
        </div>

        {profiles.map((profile) => {
          return (
            <div
              key={profile.id}
              value={profile.profile_name}
              className="hobby_img p-2 mb-4"
            >
              <img
                className="hobby_img"
                // src={`http://www.terribailey.com/images/${hobby.hobby_image}`}
                alt={profile.profile_name}
                // onClick={(ev) =>
                //   setUserHobbies({
                //     ...userHobbies,
                //     [hobby.id]: hobby.hobby_name,
                //   })
                // }
              />
              <p className="hobby-text mb-1">{profile.profile_name}</p>
              {/* id: "8c12f648-7521-4395-8212-54805bd095c6" */}
              {/* userId: "997ddd71-4757-4e42-8a9b-52f2d2feb4b8" */}
              Gender: {profile.gender}
              <br />
              Political Affiliation: {profile.politicalaffiliation}
              <br />
              Religious Affiliation:{profile.religiousaffiliation}
              <br />
              Education: {profile.education}
              <br />
              Pets: {profile.pets}
              <br />
              Birthdate: {profile.birthdate}
              <br />
              Zipcode: {profile.zipcode}
              <br />
              Employment Status: {profile.employmentstatus}
              <br />
              About: {profile.about}
              <br />
              {profile.communicationpreference}
              <br />
              {/* careerid: "7196afea-99c0-46b5-8bcf-f33e526a5467" */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserProfile;
