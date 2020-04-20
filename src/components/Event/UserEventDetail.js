import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import FavButton from './FavButton';
import DeclineButton from './DeclineButton';
import InviteButton from './InviteButton';

const UserEventDetail = ({
  events,
  auth,
  eventId,

  setEventId,
  savedAsFav,
  setSavedAsFav,
  isGoing,
  setIsGoing,
  isNotGoing,
  setIsNotGoing,

  userEvents,
  // declineInvite,
  myUserEvents,
  eventDetail,
  setEventDetail,
  joinedUser,
  setJoinedUser,
  users,
  setUserEvents,
}) => {
  //const [eventDetail, setEventDetail] = useState({});
  const [eventCreator, setEventCreator] = useState({});

  // useEffect(() => {
  //   setEventDetail(events.find((e) => e.id === eventId));
  // }, []);

  // useEffect(() => {
  //   console.log('hit in effect');
  // }, [isGoing]);

  // useEffect(() => {
  //   setEventCreator(users.find((u) => u.id === eventDetail.userId));
  // }, [eventDetail.userId]);

  const inviteUser = (acceptEvent) => {
    //console.log('acceptInvite');
    // if (isNotGoing || savedAsFav) {
    //   axios
    //     .put(`/api/user_events/${acceptEvent.id}`, acceptEvent)
    //     .then((response) => {
    //       const userEvent = response.data;
    //       const updated = myUserEvents.map((_userEvent) =>
    //         _userEvent.id === userEvent.id ? userEvent : _userEvent
    //       );
    //       setUserEvents(updated);
    //       setIsGoing(userEvent);
    //     });
    // } else {
    axios.post('/api/user_events', acceptEvent).then((response) => {
      console.log(response.data, 'invite user');
      const newUserEvent = response.data;
      setUserEvents([...userEvents, newUserEvent]);
      //setIsGoing(newUserEvent);
    });
    // }
  };

  const declineInvite = (declineEvent) => {
    //console.log(declineEvent, 'declineInvite');
    if (savedAsFav) {
      axios
        .put(`/api/user_events/${isGoing.id}`, declineEvent)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setIsGoing('');
        });
    } else {
      axios.delete(`/api/user_events/${isGoing.id}`).then(() => {
        setIsGoing('');
        setUserEvents(
          myUserEvents.filter((_userEvent) => _userEvent.id !== isGoing.id)
        );
      });
    }
  };

  const addToFavorites = (addFavObj) => {
    //console.log(addFavObj, 'my fav works');
    if (isGoing) {
      axios
        .put(`/api/user_events/${isGoing.id}`, addFavObj)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setSavedAsFav(userEvent);
        });
    } else {
      axios.post('/api/user_events', addFavObj).then((response) => {
        const newUserEvent = response.data;
        setUserEvents([...myUserEvents, newUserEvent]);
        setSavedAsFav(newUserEvent);
      });
    }
  };

  const removeFromFavorites = (removeFavObj) => {
    //console.log(removeFavObj, 'remove fav obj');
    if (isGoing) {
      axios
        .put(`/api/user_events/${removeFavObj.id}`, removeFavObj)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setSavedAsFav('');
        });
    } else {
      axios.delete(`/api/user_events/${removeFavObj.id}`).then(() => {
        setSavedAsFav('');
        setUserEvents(
          myUserEvents.filter((_userEvent) => _userEvent.id !== removeFavObj.id)
        );
      });
    }
  };
  //console.log(eventDetail, 'event Detail in Detail');
  return (
    <div>
      {/* {eventCreator ? ( */}
      <div>
        <h1>User Event Detail</h1>
        <div className="card" style={{ width: '35rem' }}>
          <div className="card-body">
            <h5 className="card-title">{eventDetail.name}</h5>
            <h5 className="card-title">
              {moment(eventDetail.date).format('MMMM Do YYYY, h:mm a')}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {eventDetail.location}
            </h6>
            <p className="card-text">{eventDetail.description}</p>

            {joinedUser ? (
              <p className="card-text">
                {' '}
                accepted by
                <Link
                  to="/meetups"
                  onClick={() => console.log('user detail')}
                  className="card-link"
                >
                  {joinedUser.username}
                </Link>
              </p>
            ) : (
              <p className="card-text">Has not been accepted yet</p>
            )}

            {/* <FavButton
                addToFavorites={addToFavorites}
                auth={auth}
                isGoing={isGoing}
                savedAsFav={savedAsFav}
                setSavedAsFav={setSavedAsFav}
                removeFromFavorites={removeFromFavorites}
                eventDetail={eventDetail}
              /> */}
            {joinedUser ? (
              <DeclineButton
                savedAsFav={savedAsFav}
                declineInvite={declineInvite}
              />
            ) : (
              <InviteButton
                users={users}
                inviteUser={inviteUser}
                eventDetail={eventDetail}
                // savedAsFav={savedAsFav}
                // auth={auth}
              />
            )}
            <button
              onClick={() => {
                // setSavedAsFav(false);
                // setIsNotGoing(false);
                setJoinedUser('');
                setEventDetail('');
              }}
            >
              Close Detail
            </button>
            <button
              onClick={() => {
                console.log('delete event');
              }}
              className="btn btn-secondary"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
      {/* ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default UserEventDetail;
