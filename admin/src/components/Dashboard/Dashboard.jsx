import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './../../components/Sidebar/Sidebar';
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/dashboard').then(res => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="admin-panel">
      <div className="main-content">
        <h2>Dashboard</h2>
        <p>Students: {stats.students}</p>
        <p>Teachers: {stats.teachers}</p>
        <p>Reviewers: {stats.reviewers}</p>
        <p>Total Projects: {stats.totalProjects}</p>
        <div>
          <h3>Recent Contributions</h3>
          <ul>
            {stats.recentContributions?.map(project => (
              <li key={project._id}>{project.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
