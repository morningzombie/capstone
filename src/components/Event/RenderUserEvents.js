import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import UserEventDetail from './UserEventDetail';

const RenderUserEvents = ({
  events,
  auth,
  userEvents,
  users,
  setUserEvents,
}) => {
  const [eventDetail, setEventDetail] = useState('');
  const [userEventDetail, setUserEventDetail] = useState('');
  const [joinedUser, setJoinedUser] = useState('');
  const [invitedUser, setInvitedUser] = useState('');
  const myEvents = events.filter((e) => e.userId === auth.id);

  //console.log(users, 'users');

  useEffect(() => {
    const invitedUserEvent = userEvents.find((userEvent) => {
      return (
        userEvent.eventId === eventDetail.id && userEvent.status === 'invited'
      );
    });

    const acceptedUserEvent = userEvents.find((userEvent) => {
      return (
        userEvent.eventId === eventDetail.id && userEvent.status === 'accepted'
      );
    });
    setUserEventDetail(acceptedUserEvent);
    if (acceptedUserEvent) {
      const acceptedByUser = users.find(
        (user) => user.id === acceptedUserEvent.joinedUserId
      );
      setJoinedUser(acceptedByUser);
    }
    if (invitedUserEvent) {
      const invitedUser = users.find(
        (user) => user.id === invitedUserEvent.joinedUserId
      );
      setInvitedUser(invitedUser);
    }

    //console.log(acceptedByUser, 'use effect');
  }, [eventDetail]);
  console.log(eventDetail, 'event Detail', invitedUser);

  if (eventDetail) {
    return (
      <UserEventDetail
        setEventDetail={setEventDetail}
        eventDetail={eventDetail}
        myEvents={myEvents}
        userEventDetail={userEventDetail}
        setJoinedUser={setJoinedUser}
        joinedUser={joinedUser}
        users={users}
        userEvents={userEvents}
        setUserEvents={setUserEvents}
      />
    );
  } else {
    return (
      <div>
        <h1>My events ({myEvents.length})</h1>
        {myEvents.map((event) => {
          return (
            <div className="card" key={event.id} style={{ width: '18rem' }}>
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <h5 className="card-title">
                  {moment(event.date).format('MMMM Do YYYY, h:mm a')}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {event.location}
                </h6>
                {event.isPublic ? <p>is Public</p> : <p>private</p>}
                {event.isAccepted ? (
                  <p>is Accepted true</p>
                ) : (
                  <p>is Accepted false</p>
                )}
                <button
                  className="card-link"
                  onClick={() => {
                    // {
                    //   going ? setIsGoing(going) : null;
                    // }
                    // {
                    //   notGoing ? setIsNotGoing(notGoing) : null;
                    // }
                    setEventDetail(event);
                  }}
                >
                  View details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default RenderUserEvents;
