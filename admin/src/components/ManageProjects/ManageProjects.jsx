import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProjects.css';

const ManageProjects = () => {
  const [projects, setProjects] = useState({
    running: [],
    rejected: [],
    completed: [],
  });
  const [activeTab, setActiveTab] = useState('running');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/projects');
      setProjects({
        running: res.data.running || [],
        rejected: res.data.rejected || [],
        completed: res.data.completed || [],
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setLoading(false);
    }
  };

  const renderProjectList = (projectArray) => {
    return projectArray.length === 0 ? (
      <p className="empty-msg">No projects in this category.</p>
    ) : (
      <div className="project-list">
        {projectArray.map((proj) => (
          <div key={proj._id} className="project-card">
            <h3>{proj.title}</h3>
            <p><strong>Submitted by:</strong> {proj.teacherName || 'Unknown'}</p>
            <p><strong>Status:</strong> {proj.status}</p>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <p className="loading-text">Loading projects...</p>;

  return (
    <div className="manage-projects-container">
      <h2>Manage Projects</h2>

      <div className="tabs">
        <button className={activeTab === 'running' ? 'active' : ''} onClick={() => setActiveTab('running')}>Running</button>
        <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>Completed</button>
        <button className={activeTab === 'rejected' ? 'active' : ''} onClick={() => setActiveTab('rejected')}>Rejected</button>
      </div>

      <div className="tab-content">
        {activeTab === 'running' && renderProjectList(projects.running)}
        {activeTab === 'completed' && renderProjectList(projects.completed)}
        {activeTab === 'rejected' && renderProjectList(projects.rejected)}
      </div>
    </div>
  );
};

export default ManageProjects;
