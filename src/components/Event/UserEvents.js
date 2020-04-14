import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const UserEvents = ({ events, auth }) => {
  // useEffect(() => {
  //   console.log('use effect');
  // }, [events]);

  return (
    <div>
      <h1>My events ({events.length})</h1>
      {events
        .filter((e) => e.userId === auth.id)
        .map((event) => {
          return (
            <div className="card" key={event.id} style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <h5 className="card-title">
                  {moment(event.date).format('MMMM Do YYYY, h:mm a')}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {event.location}
                </h6>
                <p className="card-text">{event.description}</p>
                <a href="#" className="card-link">
                  Store in favorites
                </a>
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
