import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import './Header.css';

function Header() {
  return (
    <header>
      <nav className="navbar">
        <button className="header-btn"><Link className="navbar-brand" to="/">Home</Link></button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <button className="header-btn"><Link className='nav-item' to="/todo">My activities</Link></button>
              <button className="header-btn" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div>
              <button className="header-btn"><Link className='nav-item' to="/login">Sign In</Link></button>
              <button className="header-btn"><Link className='nav-item' to="/signup">Sign Up</Link></button>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;