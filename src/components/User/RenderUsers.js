import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const RenderUsers = ({ users, auth }) => {
  return (
    <div>
      <h1>Users ({users.length - 1})</h1>
      {users
        .filter((u) => u.id !== auth.id)
        .map((user) => {
          return (
            <div className="card" key={user.id} style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.phone}</h6>
                <p className="card-text">{user.email}</p>
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

export default RenderUsers;
