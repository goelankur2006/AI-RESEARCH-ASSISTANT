import React, { useState, useEffect } from 'react';
import LoginPopup from '../LoginPopup/LoginPopup'; // adjust path as needed
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const teacherId = localStorage.getItem('teacherId');
    setIsLoggedIn(!!teacherId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('teacherId');
    localStorage.removeItem('token');
    alert("Logged out successfully");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const openLogin = () => {
    setShowLoginPopup(true);
  };

  const closeLogin = () => {
    setShowLoginPopup(false);
    setIsLoggedIn(!!localStorage.getItem('teacherId')); // update login state
  };

  return (
    <nav className="navbar">
      <h2>Research Portal</h2>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={openLogin}>Login</button>
      )}

      {showLoginPopup && <LoginPopup onClose={closeLogin} />}
    </nav>
  );
};

export default Navbar;
