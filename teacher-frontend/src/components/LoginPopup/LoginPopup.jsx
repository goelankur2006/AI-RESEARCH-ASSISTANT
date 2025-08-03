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
      const response = await axios.post('http://localhost:5000/api/teacher/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      // Save teacherId in localStorage
      localStorage.setItem('teacherId', response.data.teacher._id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('teacherName', response.data.teacher.name);

      // Navigate to teacher panel
      Navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check credentials.');
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
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
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
