import React from 'react';
import { Link } from 'react-router-dom';

export default function DeclineButton({ savedAsFav, declineInvite }) {
  return (
    <Link
      to="/meetups"
      onClick={() =>
        declineInvite({
          ...savedAsFav,
          status: 'declined',
        })
      }
      className="card-link"
    >
      Decline invite
    </Link>
  );
}
