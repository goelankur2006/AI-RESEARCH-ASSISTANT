import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProjects.css';

const ManageProjects = () => {
  const [projects, setProjects] = useState({
    pending: [],
    rejected: [],
    completed: [],
  });
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      const grouped = {
        pending: [],
        completed: [],
        rejected: [],
      };

      res.data.forEach(project => {
        if (project.status === 'approved') grouped.completed.push(project);
        else if (project.status === 'rejected') grouped.rejected.push(project);
        else grouped.pending.push(project); // ⬅️ Pending is correct here
      });

      setProjects(grouped);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    let feedback = '';
    if (status === 'rejected') {
      feedback = prompt('Enter reason for rejection:');
    }

    try {
      await axios.put(`/api/projects/${id}`, { status, feedback });
      fetchProjects();
    } catch (err) {
      console.error(`Error updating project status to ${status}:`, err);
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
                <button onClick={() => handleAction(proj._id, 'approved')} className="approve-btn">Approve</button>
                <button onClick={() => handleAction(proj._id, 'rejected')} className="reject-btn">Reject</button>
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
        <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>Pending</button>
        <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>Approved</button>
        <button className={activeTab === 'rejected' ? 'active' : ''} onClick={() => setActiveTab('rejected')}>Rejected</button>
      </div>

      <div className="tab-content">
        {renderProjectList(projects[activeTab])}
      </div>
    </div>
  );
};

export default ManageProjects;
