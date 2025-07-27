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
      const res = await axios.get('/api/projects'); // Vite proxy handles localhost
      const grouped = {
        running: [],
        completed: [],
        rejected: []
      };

      res.data.forEach(project => {
        if (project.status === 'approved') grouped.completed.push(project);
        else if (project.status === 'rejected') grouped.rejected.push(project);
        else grouped.running.push(project);
      });

      setProjects(grouped);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/projects/${id}/approve`);
      fetchProjects();
    } catch (err) {
      console.error('Error approving project:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/projects/${id}/reject`);
      fetchProjects();
    } catch (err) {
      console.error('Error rejecting project:', err);
    }
  };

  const renderProjectList = (list) => {
    if (list.length === 0) return <p className="empty-msg">No projects in this category.</p>;

    return (
      <div className="project-list">
        {list.map((proj) => (
          <div key={proj._id} className="project-card">
            <h3>{proj.title}</h3>
            <p><strong>Submitted by:</strong> {proj.teacherName || 'Unknown'}</p>
            <p><strong>Status:</strong> {proj.status}</p>
            <p>{proj.description}</p>

            {proj.status === 'pending' && (
              <div className="button-group">
                <button onClick={() => handleApprove(proj._id)} className="approve-btn">Approve</button>
                <button onClick={() => handleReject(proj._id)} className="reject-btn">Reject</button>
              </div>
            )}
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
        {renderProjectList(projects[activeTab])}
      </div>
    </div>
  );
};

export default ManageProjects;
