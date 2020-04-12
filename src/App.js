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

// import Orders from './Orders';
// import Cart from './Cart';
// import Products from './Products';

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
    axios.get('/api/hobbies').then((response) => setHobbies(response.data));
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);
  console.log(auth, 'auth in app');

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
            <FileUpload />
          </Route>
          <Route path="/userinfo" exact>
            <UserInfo />
          </Route>
          <Route path="/userhobbies" exact>
            <UserHobbies />
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
          {/* Terry try to use react routing with your commented out code and let me know if you get it */}
          {/* <div>
        {
          <div className="">
            <Nav logout={logout} />
            {/* <button type="button" onClick={logout}>
              Logout {auth.username}{" "}
            </button> */}
          {/*<div className="container mt-4">
              {params.view === undefined ? <FileUpload /> : null}
              {params.view === 'UserInfo' && <UserInfo />}
              {params.view === 'FileUpload' && <FileUpload />}
              {params.view === 'UserHobbies' && <UserHobbies />}
            </div>{' '}
            */}
        </Switch>
      </Router>
    );
  }
};

export default App;
