import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import './Header.css';

function Header() {
  return (
    <header>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">Home</Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item" to="/todo">My activities</Link>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item" to="/login">Sign In</Link>
              <Link className="nav-item" to="/signup">Sign Up</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;