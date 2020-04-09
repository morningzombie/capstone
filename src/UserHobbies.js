import React, { useState, useEffect } from "react";
import axios from "axios";

const UserHobbies = () => {
  const [hobbies, setHobbies] = useState([]);

  const handleHobbies = (e) => {
    setUserHobbies(event.target.value);
  };

  useEffect(() => {
    axios.get("/api/hobbies").then((response) => setHobbies(response.data));
  }, []);

  return (
    <div>
      <h3>What are your hobbies?</h3>
      <form>
        <div className="form-group">
          {/* {console.log(hobbies)}{" "}
          {hobbies.map((hobby) => {
            return <div key={hobby.id}>{hobby.hobby_name}</div>;
          })} */}
        </div>
      </form>
    </div>
  );
};

export default UserHobbies;
