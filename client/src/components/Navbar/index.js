import React from "react";
import { Link } from "react-router-dom";

import './Navbar.css';
import Auth from "../../utils/auth";
import logo from "../../assets/logo.jpg";

function Navbar () {
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <ul>
            <li>
              <a href="/" onClick={() => Auth.logout()}>Logout</a>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        );
      } else {
        return (
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        );
      }
    }
    return (
      <header className="navbar">
        <img className="logo" src={logo} alt="Gamology" />
        <nav>
          {showNavigation()}
        </nav>
      </header>
    );
}
  
export default Navbar;