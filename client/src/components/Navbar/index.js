import React from "react";
import { Link } from "react-router-dom";

import './Navbar.css';
import Auth from "../../utils/auth";
import logo from "../../assets/logo.png";

function Navbar () {
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <ul>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <a href="/" onClick={() => Auth.logout()}>Logout</a>
            </li>
          </ul>
        );
      } else {
        return (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        );
      }
    }
    return (
      <header className="navbar">
        <div className="home">
          <img className="logo" src={logo} alt="Gamology" />
          <Link to="/">Gamology</Link>
        </div>
        <nav>
          {showNavigation()}
        </nav>
      </header>
    );
}
  
export default Navbar;