import React, { useState, useEffect } from "react";
import qs from "qs";
import axios from "axios";
import Login from "./Login";
import FileUpload from "./components/FileUpload";
import Nav from "./Nav";
import UserInfo from "./UserInfo";
import UserHobbies from "./UserHobbies";

// import Orders from './Orders';
// import Cart from './Cart';
// import Products from './Products';

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
    window.location.hash = "#";
    window.localStorage.removeItem("token");
    setAuth({});
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const { view } = params;

  if (!auth.id) {
    return (
      <div>
        <Login login={login} />
      </div>
    );
  } else {
    return (
      <div>
        {
          <div className="">
            <Nav logout={logout} />
            <button type="button" onClick={logout}>
              Logout {auth.username}{" "}
            </button>

            <div className="container mt-4">
              {params.view === undefined ? <FileUpload /> : null}
              {params.view === "UserInfo" && <UserInfo />}
              {params.view === "FileUpload" && <FileUpload />}
              {params.view === "UserHobbies" && <UserHobbies />}
            </div>
          </div>
        }
      </div>
    );
  }
};

export default App;
