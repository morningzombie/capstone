import React, { useState, useEffect } from "react";
import axios from "axios";
let clicks = 0;
const UserHobbies = (auth) => {
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState({});
  const [selected, setSelected] = useState([]);

  // const selectMe = (ev) => {
  const eachHobby = Object.keys(userHobbies);
  // console.log("ARR", eachHobby);
  // for (let i = 0; i < hobbies.length; i++) {
  //   console.log(hobbies[i].id);
  // }
  // eachHobby.forEach((hobbyId) => {
  //   // console.log("EACH ID", hobbyId);
  //   for (let i = 0; i < hobbies.length; i++) {
  //     //console.log(hobbies[i].id);
  //     if (hobbies[i].id === hobbyId) {
  //       console.log("Match", hobbies[i].id);
  //     }
  //   }
  // });

  const toggleImage = (hobby) => {
    let img1 = `http://www.terribailey.com/images/${hobby.hobby_image}`;
    let img2 = `http://www.terribailey.com/images/imagesShadow/${hobby.hobby_image}`;
    let imgElement = document.getElementById(hobby.id);
    //console.log("WHAT", imgElement);
    imgElement.src = imgElement.src === img1 ? img2 : img1;
    clicks = clicks + 1;
    setSelected({
      ...selected,
      [hobby.id]: clicks,
    });
    console.log("DD", Object.values(selected));
    let nums = Object.values(selected);

    let selectedGroup = [];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].clicks % 2) {
        selectedGroup.push(selected[i]);
      }
    }
    console.log("SG", selectedGroup);

    // if (Object.values(selected) % 2) {
    //   console.log(Object.keys(selected));
    // }
    // if (imgElement.src === img1) {

    // let x = selected.filter((numClicks) => numClicks % 2);
    // console.log("x", x);
    // }
  };
  const numClicks = Object.values(selected);
  const eachHobbyid = Object.keys(selected);
  console.log("Selected", selected);
  // console.log("numClicks", numClicks);
  // console.log("eachHobbyid", eachHobbyid);

  selected.filter;
  // console.log("USER", auth.auth.id);
  // console.log("F", auth);
  const userId = auth.auth.id;

  useEffect(() => {
    axios.get("/api/hobbies").then((response) => setHobbies(response.data));
  }, []);

  const createUserHobbies = (user) => {
    axios.post("/api/createUserHobbies", user).then((response) => {
      console.log("USERHobby", response);
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const eachHobby = Object.keys(userHobbies);
    console.log("ARR", eachHobby);
    eachHobby.forEach((hobbyId) => {
      console.log("EACH ID", hobbyId);

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
                <div>
                  <img
                    className="hobby_img"
                    src={`http://www.terribailey.com/images/${hobby.hobby_image}`}
                    id={hobby.id}
                    alt={hobby.hobby_name}
                    onClick={(ev) => {
                      setUserHobbies({
                        ...userHobbies,
                        [hobby.id]: hobby.hobby_name,
                      });
                      toggleImage(hobby);
                    }}
                  />
                </div>
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
