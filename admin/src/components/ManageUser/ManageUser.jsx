import React, { useState } from 'react';
import axios from 'axios';
import './ManageUser.css';

const ManageUser = () => {
  const [name, setName] = useState('');
  const [employeeID, setemployeeID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/teachers/add', {
        name,
        employeeID,
        email,
        password,
      });
      setMsg(res.data.message);
      setName('');
      setemployeeID('');
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
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Employee ID:</label>
        <input
          type="number"
          value={employeeID}
          onChange={(e) => setemployeeID(e.target.value)}
          required
        />

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

export default ManageUser;
