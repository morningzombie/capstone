import React from 'react';
import { Link } from 'react-router-dom';

export default function AcceptButton({
  savedAsFav,
  acceptInvite,
  auth,
  eventDetail,
}) {
  return (
    <div>
      {savedAsFav ? (
        <Link
          to="/meetups"
          onClick={() => {
            //console.log(savedAsFav, 'when there is fav');
            acceptInvite({
              ...savedAsFav,
              status: 'accepted',
            });
          }}
          className="card-link"
        >
          Accept invite
        </Link>
      ) : (
        <Link
          to="/meetups"
          onClick={() => {
            //console.log(savedAsFav, 'when there is no fav');
            acceptInvite({
              joinedUserId: auth.id,
              eventId: eventDetail.id,
              status: 'accepted',
            });
          }}
          className="card-link"
        >
          Accept invite
        </Link>
      )}
    </div>
  );
}
