import React from 'react';
import './Navbar.css';

const Navbar = ({ teacherName }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>AI Research Assistant</h2>
      </div>
      <div className="navbar-right">
        <span className="teacher-name">Welcome, {teacherName || 'Teacher'}</span>
        <button className="logout-btn" onClick={() => alert("Logout functionality here")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
