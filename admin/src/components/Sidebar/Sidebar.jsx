import React from 'react';
import { Link } from 'react-router-dom';  
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title"></div>
      <ul className="sidebar-list">
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/ManageUser">Manage Users</Link></li>
        <li><Link to="/ApproveProjects">Approve Projects</Link></li>
        <li><Link to="/manageProject">Manage Project</Link></li>
        <li><Link to="/ReviewContributions">Review Contributions</Link></li>
        <li><Link to="/MonitorPayments">Monitor Payments</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
