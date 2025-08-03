import {React, useState, useEffect} from 'react';
import './Navbar.css';
import { IoPerson } from "react-icons/io5"; // or "react-icons/io" based on your usage
import { Link } from 'react-router-dom';
import LoginPopup from '../LoginPopup/LoginPopup';

const Navbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
      }, []);
    
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
    <nav className="admin-navbar">
      <div className="nav-left">
        <h2 className="logo">Admin Panel</h2>
      </div>

      <div className="nav-center">
        <a href="/home" className="nav-link">Home</a>
        <a href="/settings" className="nav-link">Settings</a>
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
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

    </nav>
  );
};

export default Navbar;