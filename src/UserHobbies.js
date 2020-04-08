import React, { useState } from "react";

const UserHobbies = (hobbies) => {
  const [userHobbies, setUserHobbies] = useState([]);

  const handleHobbies = (e) => {
    setUserHobbies(event.target.value);
  };

  return (
    <div>
      <h3>What are your hobbies?</h3>
      <form>
        <div className="form-group">
          {" "}
          <label htmlFor="career">What do you like to do?</label>
          <select className="form-control" id="hobbies" defaultValue>
            <option value={userHobbies} onChange={handleHobbies}>
              {userHobbies}
            </option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default UserHobbies;
