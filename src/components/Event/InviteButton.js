import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InviteButton({
  // savedAsFav,
  // auth,
  inviteUser,
  eventDetail,
  users,
}) {
  const [selectedUserId, setSelectedUserId] = useState('');
  //console.log(selectedUserId, 'user');
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">
            Select User to Invite
          </label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option>select a friend</option>
            {users.map((user) => {
              //console.log(user);
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </div>
      </form>

      <Link
        to="/my/meetups"
        onClick={() => {
          inviteUser({
            joinedUserId: selectedUserId,
            eventId: eventDetail.id,
            status: 'invited',
          });
        }}
        className="card-link"
      >
        Invite
      </Link>
    </div>
  );
}
