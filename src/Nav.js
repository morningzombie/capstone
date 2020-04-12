import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import Login from './Login';

const Nav = ({ params, logout, auth }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        WannaHang
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item dropdown">
            <Link
              to="/userinfo"
              className="nav-link dropdown-toggle"
              // href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              User Info
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link
                to="/userprofile"
                className="dropdown-item"
                // href={`#${qs.stringify({ view: 'UserInfo' })}`}
                className={params === 'UserInfo' ? 'selected' : '/'}
              >
                User Profile
              </Link>
              <br />
              <Link
                to="/userhobbies"
                className="dropdown-item"
                // href={`#${qs.stringify({ view: 'UserHobbies' })}`}
                className={params === 'UserHobbies' ? 'selected' : '/'}
              >
                User Hobbies
              </Link>
              <Link
                to="/useraccount"
                className="dropdown-item"
                // href={`#${qs.stringify({ view: 'UserInfo' })}`}
                className={params === 'UserInfo' ? 'selected' : '/'}
              >
                User Account
              </Link>
              <a className="dropdown-item" href="#">
                User Events
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                // href={`#${qs.stringify({ view: 'FileUpload' })}`}
                className={params === 'FileUpload' ? 'selected' : '/'}
              >
                Upload a Photo
              </a>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0 mr-2"
            type="submit"
          >
            Search
          </button>
        </form>

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
export default Nav;
