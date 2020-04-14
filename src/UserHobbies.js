import React, { useState, useEffect } from "react";
import axios from "axios";

const UserHobbies = (auth) => {
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState({});

  console.log("UH", userHobbies);

  // console.log("USER", auth.auth.id);
  // console.log("F", auth);
  const userId = auth.auth.id;

  useEffect(() => {
    axios.get("/api/hobbies").then((response) => setHobbies(response.data));
  }, []);

  const createUserHobbies = (user) => {
    axios.post("/api/createUserHobbies", user).then((response) => {
      console.log("USERHobby", response);
      // login({ email, password }).catch((ex) =>
      //   setError(ex.response.data.message)
      // );
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const eachHobby = Object.keys(userHobbies);
    console.log("ARR", eachHobby);
    eachHobby.forEach((hobbyId) => {
      console.log("EACH ID", hobbyId);
      //   // if (confirmPassword !== password) {
      //   //   return setPasswordError("Please confirm correct password");
      //   // } else
      createUserHobbies({
        userId,
        hobbyId,
      });
    });
  };

  return (
    <div className="" onSubmit={onSubmit}>
      <h3>What do you like to do?</h3>
      <form className="container ">
        <button>Submit</button>
        <div className="form-group d-flex flex-wrap align-content-around">
          {hobbies.map((hobby) => {
            return (
              <div
                key={hobby.id}
                value={hobby.hobby_name}
                className="hobby_img p-2 mb-4"
              >
                <img
                  className="hobby_img"
                  src={`http://www.terribailey.com/images/${hobby.hobby_image}`}
                  alt={hobby.hobby_name}
                  onClick={(ev) =>
                    setUserHobbies({
                      ...userHobbies,
                      [hobby.id]: hobby.hobby_name,
                    })
                  }
                />
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
