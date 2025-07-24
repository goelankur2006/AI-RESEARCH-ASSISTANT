import React from 'react';
import { Link } from 'react-router-dom';
import './TeacherSidebar.css';

const TeacherSidebar = () => (
  <div className="teacher-sidebar">
    <ul>
      <li><Link to="/teacher/researches">My Researches</Link></li>
      <li><Link to="/teacher/requests">New Requests</Link></li>
      <li><Link to="/teacher/assistants">My Assistants</Link></li>
      <li><Link to="/teacher/add-project">Add Project</Link></li>
      <li><Link to="/teacher/payment">Make Payment</Link></li>
    </ul>
  </div>
);

export default TeacherSidebar;
