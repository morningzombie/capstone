import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ logout, auth, params }) => {
  const [profiles, setProfiles] = useState([]);

  //console.log("AUTH", auth); //returns user that is signed in
  //console.log("PROF", profiles); //returns an array of all users

  useEffect(() => {
    axios.get("/api/profiles").then((response) => setProfiles(response.data));
  }, []);

  const myProfile = profiles.find(({ userId }) => userId === auth.id);
  console.log(myProfile); // returns 1 object that matches auth.id with gender, religion, etc

  return (
    <div>
      <h3>All About Me</h3>
      {/* {myProfile.gender} */}
    </div>
  );
};
export default UserProfile;
