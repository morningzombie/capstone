import React, { useState, useEffect } from "react";
import axios from "axios";
// import Art from './assets/img/art.png';
//const art = require("./art.png");

const UserHobbies = () => {
  const [hobbies, setHobbies] = useState([]);

  const handleHobbies = (e) => {
    setUserHobbies(event.target.value);
  };
  useEffect(() => {
    axios.get("/api/hobbies").then((response) => setHobbies(response.data));
  }, []);
  return (
    <div className="">
      <h3>What do you like to do?</h3>
      <form className="container ">
        <div className="form-group d-flex flex-wrap align-content-around">
          {hobbies.map((hobby) => {
            return (
              <div key={hobby.id} className="hobby_img p-2 mb-4">
                {/* <img
                  className="hobby_img"
                  src={`http://www.terribailey.com/images/${hobby.hobby_image}`}
                  alt={hobby.hobby_name}
                /> */}
                <p className="hobby-text mb-1">{hobby.hobby_name}</p>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default UserHobbies;
