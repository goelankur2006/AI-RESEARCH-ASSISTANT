import React from 'react';
import { Link } from 'react-router-dom';
import './TeacherSidebar.css';

const TeacherSidebar = () => (
  <div className="teacher-sidebar">
    <ul>
      <li><Link to="/teacher/my-researches">Approved Projects</Link></li>
      <li><Link to="/teacher/new-requests">Contribution Requests</Link></li>
      <li><Link to="/teacher/my-assistants">My Contributees</Link></li>
      <li><Link to="/teacher/add-project">Add Project</Link></li>
      <li><Link to="/teacher/make-payment">Make Payment</Link></li>
      <li><Link to="/teacher/pending-projects">Pending Projects</Link></li>
      <li><Link to="/teacher/rejected-projects">Rejected Projects</Link></li>
    </ul>
  </div>
);

export default TeacherSidebar;
