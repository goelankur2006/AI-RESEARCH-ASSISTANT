import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.jsx';
import LoginPopup from '../LoginPopup/LoginPopup';
import { Link } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";


const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On initial load, check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // When login popup closes, update login state
  const handleLoginClose = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setShowPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className='navbar'>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-research">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/AllResearchPapers">All Research Papers</Link></li>
        <li><Link to="/MyContribution">My Contribution</Link></li>
        <li><Link to="/Chats">Chats</Link></li>
      </ul>

      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="navbar-profile">
            <IoPerson alt="Profile"
              className="profile-icon" />
            
            <div className="profile-dropdown">
              <Link to="/Profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowPopup(true)}>Sign up / Login</button>
        )}
      </div>

      {showPopup && <LoginPopup onClose={handleLoginClose} />}
    </div>
  );
};

export default Navbar;
