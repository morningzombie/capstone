import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DeclineAcceptanceButton({
  unInviteUser,
  userEventDetail,
  joinedUser,
  declineAcceptance,
}) {
  return (
    <div>
      <p className="card-text">
        accepted by{' '}
        <Link
          to="/my/meetups"
          className="card-link"
          onClick={() => console.log('user detail')}
        >
          {joinedUser.username}
        </Link>
      </p>
      <button
        className="btn btn-info"
        onClick={() => {
          declineAcceptance({ ...userEventDetail, status: 'declined' });
        }}
      >
        Decline acceptance
      </button>
    </div>
  );
}
