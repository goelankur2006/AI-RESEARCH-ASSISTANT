import React, { useState } from 'react';
import axios from 'axios';
import './ManageUser.css'; 

const ManageAddUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/teachers/add',{
        email,
        password,
      });
      setMsg(res.data.message);
      setEmail('');
      setPassword('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="form-section">
      <h2>Add New Teacher</h2>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register-btn">Register</button>
        {msg && <p className="message">{msg}</p>}
      </form>
    </div>
  );
};

export default ManageAddUsers;



