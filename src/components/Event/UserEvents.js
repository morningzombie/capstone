import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const UserEvents = ({ events, auth }) => {
  const myEvents = events.filter((e) => e.userId === auth.id);
  // useEffect(() => {
  //   console.log('use effect');
  // }, [events]);

  return (
    <div>
      <h1>My events ({myEvents.length})</h1>
      {events
        .filter((e) => e.userId === auth.id)
        .map((event) => {
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
                {/* <p className="card-text">{event.description}</p> */}
                {event.isPublic ? (
                  ''
                ) : (
                  <a href="#" className="card-link">
                    Invite a friend
                  </a>
                )}
                <a href="#" className="card-link">
                  View details
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserEvents;
