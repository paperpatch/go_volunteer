import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="d-flex mb-0">
          <li className="mx-2">
            <Link to="/">
              Events
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li className="mx-2">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="d-flex mb-0">
          <li className="mx-2">
            <Link to="/">
              Events
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          Go Volunteer
        </Link>
      </h1>

      <nav className="d-flex align-items-center">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
