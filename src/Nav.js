import React from "react";
import qs from "qs";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import UserInfo from "./UserInfo";
import UserHobbies from "./UserHobbies";
import SearchCriteria from "./components/SearchCriteria";
import FileUpload from "./components/FileUpload";
import Login from "./Login";
import Home from "./Home";

const Nav = ({ params, logout, auth, login }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/#">
        <h1>WannaHang</h1>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              User Info
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <div className="nav-item">
                <Link className="nav-link" to="/register">
                  Account Settings
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/UserInfo" label="UserInfo">
                  User Profile
                </Link>
              </div>

              <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/UserHobbies"
                  label="UserHobbies"
                >
                  User Hobbies
                </Link>
              </div>

              <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/SearchCriteria"
                  label="SearchCriteria"
                >
                  Search Criteria
                </Link>
              </div>

              <div className="nav-item">
                <Link className="nav-link" to="/file/upload" label="FileUpload">
                  Upload Photo
                </Link>
              </div>

              <div className="dropdown-divider"></div>

              <div className="nav-item">
                <Link className="nav-link" to="/UserEvents" label="UserEvents">
                  User Schedule
                </Link>
              </div>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <Link
            to="/login"
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={logout}
          >
            Logout {auth.firstname} {auth.lastname}
          </Link>
        </form>
      </div>
    </nav>
  );
};
// function NavBarLinks({ label, to, activeOnlyWhenExact }) {
//   let match = useRouteMatch({
//     path: to,
//     exact: activeOnlyWhenExact,
//   });

// return (
//   <div className={match ? "active" : ""}>
//     {match && ""}
//     <Link to={to}>{label}</Link>
//   </div>
// );
// }

export default Nav;
