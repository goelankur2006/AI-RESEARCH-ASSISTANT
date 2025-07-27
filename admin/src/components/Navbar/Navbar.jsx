import React from 'react';
import './Navbar.css';

const Navbar = () => {
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

      <div className="nav-right">
        <button className="profile-btn">Sign Up / Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;