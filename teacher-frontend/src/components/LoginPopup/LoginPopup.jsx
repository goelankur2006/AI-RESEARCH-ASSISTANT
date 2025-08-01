import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets.jsx';
import axios from 'axios';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/teacher/login', {
      email,
      password
    });

    console.log("🧠 Login response data:", res.data);

    const { teacherId, token } = res.data;

    if (teacherId) {
      localStorage.setItem('teacherId', teacherId);
      localStorage.setItem('token', token);
      alert("Login successful");
      window.location.reload();
    } else {
      alert("❌ teacherId missing in response");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed");
  }
};



  return (
    <div className='login-popup'>
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
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
