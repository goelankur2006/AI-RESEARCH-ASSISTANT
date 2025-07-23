import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets.jsx';
import axios from 'axios';

const LoginPopup = ({ onClose }) => {
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      alert("Signup successful! Please login.");
      setCurrState("Login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className='login-popup'>
      <div className="login-popup-content">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={onClose} src={assets.cross_icon} alt="close" />
        </div>
        <form className="login-popup-container" onSubmit={(e) => {
          e.preventDefault();
          if (currState === "Login") handleLogin();
          else handleSignup();
        }}>
          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <input
                type='text'
                placeholder='Your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
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
          <button type='submit'>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
