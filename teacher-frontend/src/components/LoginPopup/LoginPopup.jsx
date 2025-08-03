import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets.jsx';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/teacher/login', {
        email,
        password
      });

      console.log("Login response:", res.data);

      const { teacherId, token } = res.data;

      if (teacherId) {
        localStorage.setItem('teacherId', res.data.teacherId);
        localStorage.setItem('token', token);
        alert("Login successful");
        window.location.reload();
      } else {
        alert("teacherId missing in response");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Login failed. Please check credentials.");
    }
  };


  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <div className="login-popup-title">
          <h2>Teacher Login</h2>
          <img onClick={onClose} src={assets.cross_icon} alt="close" />
        </div>

        <form
          className="login-popup-container"
          onSubmit={handleLogin}
        >
          <div className="login-popup-inputs">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
