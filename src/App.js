import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import Login from "./Login";
import FileUpload from "./components/FileUpload";
import Nav from "./Nav";
import CreateNewUser from "./components/User/CreateNewUser";
import Header from "./components/header/Header";
import UserInfo from "./UserInfo";
import UserHobbies from "./UserHobbies";

const headers = () => {
  const token = window.localStorage.getItem("token");
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
  const [userCareer, setUserCareer] = useState("");

  const login = async (credentials) => {
    const token = (await axios.post("/api/auth", credentials)).data.token;
    window.localStorage.setItem("token", token);
    exchangeTokenForAuth();
  };

  const exchangeTokenForAuth = async () => {
    const response = await axios.get("/api/auth", headers());
    setAuth(response.data);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    if (auth.id) {
      axios.get("/api/getHobbies", headers()).then((response) => {
        setHobbies(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get("/api/getCareers", headers()).then((response) => {
        setUserCareer(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

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
          <Link path="/FileUpload">
            <FileUpload />
          </Link>
          <Route path="/UserInfo">
            <UserInfo />
          </Route>

          <Route path="/UserHobbies">
            <UserHobbies />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
