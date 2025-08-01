import React, { useEffect, useState } from 'react';
import './Navbar.css';
import LoginPopup from '../LoginPopup/LoginPopup';

const Navbar = ({ teacherName: propTeacherName }) => {
  const [teacherName, setTeacherName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('teacherName');

    if (token && storedName) {
      setIsLoggedIn(true);
      setTeacherName(storedName || propTeacherName || 'Teacher');
    } else {
      // If no token or name → force login popup
      setIsLoggedIn(false);
      setShowLoginPopup(true);
    }
  }, [propTeacherName]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherName');
    setIsLoggedIn(false);
    setShowLoginPopup(true); // Force login again
  };

  const handleLoginSuccess = () => {
    const storedName = localStorage.getItem('teacherName');
    setIsLoggedIn(true);
    setTeacherName(storedName || 'Teacher');
    setShowLoginPopup(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <h2>AI Research Assistant</h2>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <span className="teacher-name">Welcome, {teacherName}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="login-btn" onClick={() => setShowLoginPopup(true)}>Login</button>
          )}
        </div>
      </div>

      {showLoginPopup && <LoginPopup onClose={handleLoginSuccess} />}
    </>
  );
};

export default Navbar;
