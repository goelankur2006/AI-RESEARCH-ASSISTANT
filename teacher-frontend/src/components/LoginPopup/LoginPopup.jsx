import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets.jsx';
import axios from 'axios';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = axios.post("http://localhost:5000/api/teacher/login", {
        email: "deepanshigupta585@gmail.com",
        password: "yourPlainPassword"
      });


      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='login-popup'>
      <div className="login-popup-content">
        <div className="login-popup-title">
          <h2>Teacher Login</h2>
          <img onClick={onClose} src={assets.cross_icon} alt="close" />
        </div>
        <form className="login-popup-container" onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <div className="login-popup-inputs">
            <input
              type='email'
              placeholder='Your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;