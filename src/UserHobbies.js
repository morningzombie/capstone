import React, { useState, useEffect } from "react";
import axios from "axios";
// import Art from './assets/img/art.png';
//const art = require("./art.png");

const UserHobbies = () => {
  const [hobbies, setHobbies] = useState([]);

  const handleHobbies = (e) => {
    setUserHobbies(event.target.value);
  };
  const webAddress = `http://www.terribailey.com/images/`;
  //www.terribailey.com/images/art.png
  http: useEffect(() => {
    axios.get("/api/hobbies").then((response) => setHobbies(response.data));
  }, []);
  return (
    <div className="container">
      <h3>What are your hobbies?</h3>
      <form>
        <div className="form-group d-flex align-items-stretch">
          {hobbies.map((hobby) => {
            return (
              <div key={hobby.id}>
                {/* <img
                  className="hobby_img"
                  src={`http://www.terribailey.com/images/${hobby.hobby_image}`}
                  alt={hobby.hobby_name}
                /> */}

                <br />
                {hobby.hobby_name}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default UserHobbies;
