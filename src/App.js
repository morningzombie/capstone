import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import Login from './Login';
import FileUpload from './components/FileUpload';
import Nav from './Nav';
import CreateNewUser from './components/User/CreateNewUser';
import Header from './components/header/Header';
import UserInfo from './UserInfo';
import UserHobbies from './UserHobbies';
import UserAccount from './components/User/UserAccount';
import EditUserAccount from './components/User/EditUserAccount';
import ChangeUserPassword from './components/User/ChangeUserPassword';
import SearchCriteria from './SearchCriteria';
import RenderEvents from './components/Event/RenderEvents';
import RenderUsers from './components/User/RenderUsers';
import CreateEvent from './components/Event/CreateEvent';
import UserEvents from './components/Event/UserEvents';
import UserProfile from './UserProfile';
import SearchResults from './SearchResults';

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      authorization: token,
    },
  };
};

const App = () => {
  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
  const [auth, setAuth] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [userCareer, setUserCareer] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const login = async (credentials) => {
    const token = (await axios.post('/api/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
  };

  const exchangeTokenForAuth = async () => {
    const response = await axios.get('/api/auth', headers());
    setAuth(response.data);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    if (auth.id) {
      axios
        .get('/api/events', headers())
        .then((response) => setEvents(response.data));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios
        .get('/api/users', headers())
        .then((response) => setUsers(response.data));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/getHobbies', headers()).then((response) => {
        setHobbies(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/getCareers', headers()).then((response) => {
        setUserCareer(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);
  // console.log(auth, 'auth in app');

  const { view } = params;

  if (!auth.id) {
    return (
      <Router>
        <Header logout={logout} />
        <Switch>
          <Route path="/register" exact>
            <CreateNewUser login={login} />
          </Route>
          <Route path="/login" exact>
            <Login login={login} />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Nav logout={logout} auth={auth} />
        <Switch>
          <Route path="/file/upload" exact>
            <FileUpload auth={auth} logout={logout} />
          </Route>
          <Route path="/FileUpload">
            <FileUpload />
          </Route>
          <Route path="/UserProfile">
            <UserProfile auth={auth} login={login} />
          </Route>
          <Route path="/UserInfo">
            <UserInfo auth={auth} login={login} />
          </Route>
          <Route path="/search/criteria">
            <SearchCriteria />
          </Route>
          <Route path="/search/results">
            <SearchResults />
          </Route>
          <Route path="/UserHobbies">
            <UserHobbies auth={auth} />
          </Route>
          <Route path="/useraccount/edit" exact>
            <EditUserAccount auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/useraccount" exact>
            <UserAccount logout={logout} auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/useraccount/password" exact>
            <ChangeUserPassword auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/meetups">
            <RenderEvents events={events} />
          </Route>
          <Route path="/my/meetups">
            <UserEvents events={events} auth={auth} />
          </Route>
          <Route path="/create/event">
            <CreateEvent
              auth={auth}
              setAuth={setAuth}
              setEvents={setEvents}
              events={events}
              headers={headers}
            />
          </Route>
          <Route path="/friends">
            <RenderUsers users={users} auth={auth} />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
