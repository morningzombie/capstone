import React, { useState } from "react";

const UserHobbies = (hobbies) => {
  const [userHobbies, setUserHobbies] = useState([]);

  const handleHobbies = (e) => {
    setUserHobbies(event.target.value);
  };

  return (
    <div>
      <h3>Tell Us About YOU</h3>
      <form>
        <div className="form-group">
          {" "}
          <label htmlFor="career">What do you like to do?</label>
          <select className="form-control" id="pets" defaultValue>
            <option value={userPets} onChange={handleHobbies}>
              {userPets}
            </option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default UserHobbies;
